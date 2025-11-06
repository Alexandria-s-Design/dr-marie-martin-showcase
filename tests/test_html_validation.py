"""
HTML validation and structure tests
"""
import unittest
from pathlib import Path
import re


class TestHTMLStructure(unittest.TestCase):
    """Test HTML file structure and content"""

    @classmethod
    def setUpClass(cls):
        """Load HTML file once for all tests"""
        html_path = Path(__file__).parent.parent / 'index.html'
        with open(html_path, 'r', encoding='utf-8') as f:
            cls.html_content = f.read()

    def test_html_has_doctype(self):
        """Test HTML starts with DOCTYPE declaration"""
        self.assertTrue(self.html_content.strip().startswith('<!DOCTYPE html'),
                       "HTML should start with DOCTYPE declaration")

    def test_html_has_lang_attribute(self):
        """Test HTML tag has lang attribute"""
        self.assertIn('lang="en"', self.html_content,
                     "HTML tag should have lang attribute")

    def test_html_has_charset(self):
        """Test HTML has UTF-8 charset"""
        self.assertIn('charset="UTF-8"', self.html_content,
                     "HTML should declare UTF-8 charset")

    def test_html_has_viewport(self):
        """Test HTML has viewport meta tag"""
        self.assertIn('name="viewport"', self.html_content,
                     "HTML should have viewport meta tag for responsive design")

    def test_html_has_title(self):
        """Test HTML has title tag"""
        self.assertIn('<title>', self.html_content,
                     "HTML should have title tag")
        self.assertIn('Dr. Marie Martin', self.html_content,
                     "Title should mention Dr. Marie Martin")

    def test_html_has_meta_description(self):
        """Test HTML has meta description for SEO"""
        self.assertIn('name="description"', self.html_content,
                     "HTML should have meta description for SEO")

    def test_html_has_og_tags(self):
        """Test HTML has Open Graph tags for social media"""
        og_tags = ['og:title', 'og:description', 'og:image', 'og:url']
        for tag in og_tags:
            self.assertIn(f'property="{tag}"', self.html_content,
                         f"HTML should have {tag} Open Graph tag")

    def test_html_has_structured_data(self):
        """Test HTML has structured data (Schema.org)"""
        self.assertIn('application/ld+json', self.html_content,
                     "HTML should have structured data")
        self.assertIn('@context', self.html_content,
                     "Structured data should have @context")

    def test_html_has_accessibility_roles(self):
        """Test HTML has ARIA roles for accessibility"""
        aria_roles = ['role="banner"', 'role="contentinfo"', 'aria-label']
        for role in aria_roles:
            self.assertIn(role, self.html_content,
                         f"HTML should have {role} for accessibility")

    def test_videos_have_controls(self):
        """Test all video tags have controls attribute"""
        video_tags = re.findall(r'<video[^>]*>', self.html_content)
        self.assertGreater(len(video_tags), 0, "HTML should have video tags")

        for tag in video_tags:
            self.assertIn('controls', tag,
                         "All video tags should have controls attribute")

    def test_videos_have_aria_labels(self):
        """Test all videos have descriptive aria-labels"""
        video_tags = re.findall(r'<video[^>]*>', self.html_content)
        for tag in video_tags:
            self.assertIn('aria-label', tag,
                         "All video tags should have aria-label")

    def test_external_links_have_security(self):
        """Test external links have security attributes"""
        external_links = re.findall(r'<a[^>]*target="_blank"[^>]*>', self.html_content)
        for link in external_links:
            self.assertIn('rel=', link,
                         "External links should have rel attribute")
            self.assertIn('noopener', link,
                         "External links should have noopener for security")

    def test_no_inline_styles(self):
        """Test HTML doesn't use inline styles (uses external CSS)"""
        # Allow inline styles only in structured data scripts
        html_without_scripts = re.sub(r'<script[^>]*>.*?</script>', '',
                                      self.html_content, flags=re.DOTALL)
        inline_styles = re.findall(r'style="[^"]*"', html_without_scripts)
        self.assertEqual(len(inline_styles), 0,
                        "HTML should not use inline styles (use external CSS)")

    def test_css_file_linked(self):
        """Test HTML links to external CSS file"""
        self.assertIn('href="styles.css"', self.html_content,
                     "HTML should link to styles.css")

    def test_contact_email_present(self):
        """Test contact email is present"""
        self.assertIn('mailto:info@discoverycollective.com', self.html_content,
                     "HTML should have contact email link")


class TestCoverSlides(unittest.TestCase):
    """Test cover slide HTML files"""

    def test_all_cover_slides_exist(self):
        """Test that all cover slide HTML files exist"""
        base_path = Path(__file__).parent.parent
        cover_slides = ['coverslide1.html', 'coverslide2.html', 'coverslide3.html']

        for slide in cover_slides:
            slide_path = base_path / slide
            self.assertTrue(slide_path.exists(),
                          f"Cover slide {slide} should exist")

    def test_cover_slides_have_proper_dimensions(self):
        """Test cover slides are set to 1920x1080"""
        base_path = Path(__file__).parent.parent
        cover_slides = ['coverslide1.html', 'coverslide2.html', 'coverslide3.html']

        for slide in cover_slides:
            slide_path = base_path / slide
            with open(slide_path, 'r', encoding='utf-8') as f:
                content = f.read()
                self.assertIn('1920px', content,
                            f"{slide} should specify 1920px width")
                self.assertIn('1080px', content,
                            f"{slide} should specify 1080px height")


if __name__ == '__main__':
    unittest.main()
