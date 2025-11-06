"""
Unit tests for process_videos.py
"""
import unittest
import sys
from pathlib import Path
from unittest.mock import patch, MagicMock

# Mock moviepy before importing process_videos (it may not be installed)
sys.modules['moviepy'] = MagicMock()
sys.modules['moviepy.editor'] = MagicMock()

# Add parent directory to path to import process_videos
sys.path.insert(0, str(Path(__file__).parent.parent))
from process_videos import time_to_seconds, CLIPS


class TestProcessVideos(unittest.TestCase):
    """Test cases for video processing functions"""

    def test_time_to_seconds_valid(self):
        """Test time string conversion with valid inputs"""
        self.assertEqual(time_to_seconds("00:00:01"), 1)
        self.assertEqual(time_to_seconds("00:01:00"), 60)
        self.assertEqual(time_to_seconds("01:00:00"), 3600)
        self.assertEqual(time_to_seconds("03:42:47"), 13367)
        self.assertEqual(time_to_seconds("00:02:30"), 150)

    def test_clips_configuration(self):
        """Test that CLIPS configuration is valid"""
        self.assertIsInstance(CLIPS, list)
        self.assertEqual(len(CLIPS), 3)

        for clip in CLIPS:
            self.assertIn('name', clip)
            self.assertIn('start_time', clip)
            self.assertIn('end_time', clip)
            self.assertIn('cover_slide', clip)
            self.assertIn('title', clip)

            # Check that start time is before end time
            start_sec = time_to_seconds(clip['start_time'])
            end_sec = time_to_seconds(clip['end_time'])
            self.assertLess(start_sec, end_sec,
                          f"Start time must be before end time for {clip['name']}")

    def test_clip_names_unique(self):
        """Test that clip names are unique"""
        names = [clip['name'] for clip in CLIPS]
        self.assertEqual(len(names), len(set(names)),
                        "Clip names must be unique")

    def test_clip_durations_reasonable(self):
        """Test that clip durations are reasonable (between 30s and 5min)"""
        for clip in CLIPS:
            start_sec = time_to_seconds(clip['start_time'])
            end_sec = time_to_seconds(clip['end_time'])
            duration = end_sec - start_sec

            self.assertGreater(duration, 30,
                             f"Clip {clip['name']} is too short (< 30s)")
            self.assertLess(duration, 300,
                          f"Clip {clip['name']} is too long (> 5min)")


class TestEnvironmentConfig(unittest.TestCase):
    """Test environment configuration"""

    @patch.dict('os.environ', {'SOURCE_VIDEO': '/custom/path/video.mp4'})
    def test_source_video_from_env(self):
        """Test SOURCE_VIDEO can be set via environment variable"""
        import os
        # Re-import to get fresh environment variable
        from importlib import reload
        import process_videos
        reload(process_videos)

        self.assertIn('/custom/path/video.mp4', process_videos.SOURCE_VIDEO)


if __name__ == '__main__':
    unittest.main()
