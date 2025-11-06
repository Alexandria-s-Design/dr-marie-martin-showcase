"""
Dr. Marie Martin Video Showcase - Video Processing Script

This script extracts clips from the source video and adds cover slides.
Uses moviepy for video editing (easier than ffmpeg).

Installation:
    pip install moviepy pillow

Usage:
    python process_videos.py
"""

try:
    from moviepy import VideoFileClip, ImageClip, concatenate_videoclips, CompositeVideoClip, vfx
except ImportError:
    from moviepy.editor import VideoFileClip, ImageClip, concatenate_videoclips, CompositeVideoClip
    from moviepy import vfx

import os
from pathlib import Path

# Configuration
# Set SOURCE_VIDEO as environment variable or pass as command line argument
# Example: export SOURCE_VIDEO="/path/to/Dr. Martin Video.mp4"
SOURCE_VIDEO = os.environ.get('SOURCE_VIDEO', 'Dr. Martin Video.mp4')
OUTPUT_DIR = Path(__file__).parent / "output"
COVER_SLIDES_DIR = Path(__file__).parent

# Video clips configuration
CLIPS = [
    {
        "name": "clip1_computational_modeling",
        "start_time": "03:40:32",
        "end_time": "03:42:47",
        "cover_slide": "coverslide1.html",
        "title": "Computational Modeling Platform"
    },
    {
        "name": "clip2_student_ambassadors",
        "start_time": "03:42:58",
        "end_time": "03:44:45",
        "cover_slide": "coverslide2.html",
        "title": "Student Ambassadors & K-12 Implementation"
    },
    {
        "name": "clip3_teacher_army",
        "start_time": "03:48:36",
        "end_time": "03:50:40",
        "cover_slide": "coverslide3.html",
        "title": "Platform Demonstration & Teacher Army"
    }
]

# Create output directory
OUTPUT_DIR.mkdir(exist_ok=True)

def time_to_seconds(time_str):
    """Convert time string (HH:MM:SS) to seconds."""
    parts = time_str.split(':')
    return int(parts[0]) * 3600 + int(parts[1]) * 60 + int(parts[2])

def create_cover_slide_image(html_file, output_image, width=1920, height=1080):
    """
    Convert HTML cover slide to image using selenium or playwright.
    For now, this is a placeholder - you'll need to open the HTML files
    in a browser and screenshot them, or use a tool like puppeteer/playwright.

    Alternative: Create cover slides directly as images using PIL
    """
    print(f"⚠️  Please create screenshot of {html_file} and save as {output_image}")
    print(f"   Open {html_file} in browser, resize to 1920x1080, and screenshot.")
    return None

def process_clip(clip_config):
    """Extract and process a single video clip."""
    print(f"\n[VIDEO] Processing {clip_config['name']}...")

    # Convert time strings to seconds
    start_sec = time_to_seconds(clip_config['start_time'])
    end_sec = time_to_seconds(clip_config['end_time'])

    # Load the source video
    print(f"   Loading video from {start_sec}s to {end_sec}s...")
    full_video = VideoFileClip(SOURCE_VIDEO)
    video = full_video.subclipped(start_sec, end_sec)

    # Check if cover slide image exists
    cover_img_path = OUTPUT_DIR / f"{clip_config['name']}_cover.png"

    if not cover_img_path.exists():
        print(f"   [WARNING] Cover slide image not found: {cover_img_path}")
        print(f"   Please open {clip_config['cover_slide']} in browser and save screenshot")
        print(f"   as {cover_img_path} (1920x1080)")

        # Save just the clip without cover for now
        output_file = OUTPUT_DIR / f"{clip_config['name']}.mp4"
        video.write_videofile(
            str(output_file),
            codec='libx264',
            audio_codec='aac',
            temp_audiofile='temp-audio.m4a',
            remove_temp=True
        )
        print(f"   [OK] Saved clip (without cover): {output_file}")
        return

    # Create cover slide clip (2 seconds)
    print(f"   Adding 2-second cover slide...")
    cover = ImageClip(str(cover_img_path)).with_duration(2)

    # Concatenate cover slide and video
    final_clip = concatenate_videoclips([cover, video], method="compose")

    # Export final video
    output_file = OUTPUT_DIR / f"{clip_config['name']}_final.mp4"
    print(f"   Exporting final video...")
    final_clip.write_videofile(
        str(output_file),
        codec='libx264',
        audio_codec='aac',
        fps=video.fps,
        temp_audiofile='temp-audio.m4a',
        remove_temp=True
    )

    print(f"   [OK] Completed: {output_file}")

    # Close clips to free memory
    video.close()
    final_clip.close()

def main():
    """Main processing function."""
    print("=" * 60)
    print("Dr. Marie Martin Video Showcase - Video Processor")
    print("=" * 60)

    # Check if source video exists
    if not os.path.exists(SOURCE_VIDEO):
        print(f"[ERROR] Source video not found at: {SOURCE_VIDEO}")
        print(f"\nPlease set SOURCE_VIDEO environment variable or ensure video file exists:")
        print(f"  export SOURCE_VIDEO='/path/to/Dr. Martin Video.mp4'")
        print(f"  python process_videos.py")
        return 1

    print(f"\n[SOURCE] Video: {SOURCE_VIDEO}")
    print(f"[OUTPUT] Directory: {OUTPUT_DIR}")

    # Process each clip
    success_count = 0
    error_count = 0
    for clip_config in CLIPS:
        try:
            process_clip(clip_config)
            success_count += 1
        except Exception as e:
            print(f"[ERROR] Error processing {clip_config['name']}: {str(e)}")
            import traceback
            traceback.print_exc()
            error_count += 1
            continue

    print("\n" + "=" * 60)
    if error_count == 0:
        print(f"[SUCCESS] Processing complete! ({success_count} clips processed)")
    else:
        print(f"[PARTIAL SUCCESS] {success_count} clips processed, {error_count} failed")
    print(f"[OUTPUT] Videos saved in: {OUTPUT_DIR}")
    print("=" * 60)

    return 0 if error_count == 0 else 1

if __name__ == "__main__":
    import sys
    sys.exit(main())
