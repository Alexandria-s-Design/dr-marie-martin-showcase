"""
Test that all required files exist
"""
import unittest
from pathlib import Path


class TestRequiredFiles(unittest.TestCase):
    """Test that all required project files exist"""

    @classmethod
    def setUpClass(cls):
        """Set up base path"""
        cls.base_path = Path(__file__).parent.parent

    def test_index_html_exists(self):
        """Test index.html exists"""
        self.assertTrue((self.base_path / 'index.html').exists(),
                       "index.html should exist")

    def test_styles_css_exists(self):
        """Test styles.css exists"""
        self.assertTrue((self.base_path / 'styles.css').exists(),
                       "styles.css should exist")

    def test_readme_exists(self):
        """Test README.md exists"""
        self.assertTrue((self.base_path / 'README.md').exists(),
                       "README.md should exist")

    def test_license_exists(self):
        """Test LICENSE file exists"""
        self.assertTrue((self.base_path / 'LICENSE').exists(),
                       "LICENSE file should exist")

    def test_requirements_txt_exists(self):
        """Test requirements.txt exists"""
        self.assertTrue((self.base_path / 'requirements.txt').exists(),
                       "requirements.txt should exist")

    def test_gitignore_exists(self):
        """Test .gitignore exists"""
        self.assertTrue((self.base_path / '.gitignore').exists(),
                       ".gitignore should exist")

    def test_process_videos_py_exists(self):
        """Test process_videos.py exists"""
        self.assertTrue((self.base_path / 'process_videos.py').exists(),
                       "process_videos.py should exist")

    def test_setup_scripts_exist(self):
        """Test setup scripts exist"""
        self.assertTrue((self.base_path / 'setup.bat').exists(),
                       "setup.bat should exist for Windows users")
        self.assertTrue((self.base_path / 'setup.sh').exists(),
                       "setup.sh should exist for Mac/Linux users")

    def test_output_directory_exists(self):
        """Test output directory exists"""
        self.assertTrue((self.base_path / 'output').exists(),
                       "output directory should exist")

    def test_cover_slides_exist(self):
        """Test all cover slide HTML files exist"""
        cover_slides = ['coverslide1.html', 'coverslide2.html', 'coverslide3.html']
        for slide in cover_slides:
            self.assertTrue((self.base_path / slide).exists(),
                          f"{slide} should exist")


class TestRequirementsTxt(unittest.TestCase):
    """Test requirements.txt content"""

    @classmethod
    def setUpClass(cls):
        """Load requirements.txt"""
        requirements_path = Path(__file__).parent.parent / 'requirements.txt'
        with open(requirements_path, 'r') as f:
            cls.requirements = f.read()

    def test_moviepy_in_requirements(self):
        """Test moviepy is in requirements"""
        self.assertIn('moviepy', self.requirements,
                     "moviepy should be in requirements.txt")

    def test_pillow_in_requirements(self):
        """Test pillow is in requirements"""
        self.assertIn('pillow', self.requirements.lower(),
                     "pillow should be in requirements.txt")

    def test_pytest_in_requirements(self):
        """Test pytest is in requirements"""
        self.assertIn('pytest', self.requirements,
                     "pytest should be in requirements.txt for testing")


if __name__ == '__main__':
    unittest.main()
