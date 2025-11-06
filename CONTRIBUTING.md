# Contributing to Dr. Marie Martin Video Showcase

Thank you for your interest in contributing to this project! This document provides guidelines and instructions for contributing.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Testing](#testing)
- [Submitting Changes](#submitting-changes)
- [Style Guidelines](#style-guidelines)

## Code of Conduct

This project adheres to a code of conduct that promotes a welcoming and inclusive environment. By participating, you are expected to uphold this code.

### Our Standards

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on what is best for the community
- Show empathy towards others

## Getting Started

### Prerequisites

- Python 3.8 or higher
- Git
- A modern web browser

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/dr-marie-martin-showcase.git
   cd dr-marie-martin-showcase
   ```

## Development Setup

### 1. Install Python Dependencies

```bash
pip install -r requirements.txt
```

### 2. Set Up Source Video (Optional)

If you have access to the source video:

```bash
export SOURCE_VIDEO="/path/to/Dr. Martin Video.mp4"
```

### 3. Verify Setup

```bash
# Run tests
python -m pytest tests/ -v

# Check HTML
open index.html  # macOS
xdg-open index.html  # Linux
start index.html  # Windows
```

## Making Changes

### 1. Create a Branch

Create a descriptive branch name:

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

### 2. Make Your Changes

- Keep changes focused and atomic
- Follow existing code style
- Add tests for new functionality
- Update documentation as needed

### 3. Test Your Changes

Before committing, ensure:

```bash
# Run all tests
python -m pytest tests/ -v

# Check code formatting
black --check .

# Lint code
flake8 .
```

## Testing

### Running Tests

```bash
# Run all tests
python tests/run_all_tests.py

# Run specific test file
python -m pytest tests/test_process_videos.py -v

# Run with coverage
python -m pytest tests/ --cov=. --cov-report=html
```

### Writing Tests

- Place tests in the `tests/` directory
- Name test files `test_*.py`
- Name test functions `test_*`
- Use descriptive test names
- Include docstrings explaining what is tested

Example:

```python
def test_video_clips_have_unique_names(self):
    """Test that all video clip names are unique"""
    names = [clip['name'] for clip in CLIPS]
    self.assertEqual(len(names), len(set(names)))
```

## Submitting Changes

### 1. Commit Your Changes

Write clear, concise commit messages:

```bash
git add .
git commit -m "Add feature: description of what you did"
```

Good commit message examples:
- `Fix: Correct video filename mismatch in HTML`
- `Feature: Add accessibility ARIA labels to videos`
- `Docs: Update README with new setup instructions`
- `Test: Add unit tests for time_to_seconds function`

### 2. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

### 3. Create a Pull Request

1. Go to the original repository on GitHub
2. Click "New Pull Request"
3. Select your fork and branch
4. Fill in the PR template with:
   - Clear description of changes
   - Issue number (if applicable)
   - Screenshots (for UI changes)
   - Testing performed

### 4. Wait for Review

- Maintainers will review your PR
- Address any requested changes
- Once approved, your PR will be merged

## Style Guidelines

### Python Code

- Follow PEP 8 style guide
- Use Black for code formatting (line length: 100)
- Use meaningful variable names
- Add docstrings to functions and classes
- Keep functions focused and small

Example:

```python
def time_to_seconds(time_str: str) -> int:
    """
    Convert time string (HH:MM:SS) to seconds.

    Args:
        time_str: Time in format "HH:MM:SS"

    Returns:
        Total seconds as integer

    Example:
        >>> time_to_seconds("01:30:00")
        5400
    """
    parts = time_str.split(':')
    return int(parts[0]) * 3600 + int(parts[1]) * 60 + int(parts[2])
```

### HTML/CSS

- Use semantic HTML5 elements
- Include ARIA labels for accessibility
- Keep CSS in external stylesheet
- Use meaningful class names
- Ensure responsive design

### Git Commits

- Use present tense ("Add feature" not "Added feature")
- Be descriptive but concise
- Reference issues/PRs when relevant

## Types of Contributions

### Bug Reports

When reporting bugs, include:
- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Environment details (OS, Python version, browser)

### Feature Requests

When suggesting features:
- Explain the use case
- Describe the proposed solution
- Consider alternatives
- Note any breaking changes

### Documentation

Documentation improvements are always welcome:
- Fix typos or unclear explanations
- Add examples
- Improve setup instructions
- Translate to other languages

## Questions?

If you have questions:
- Check existing issues and discussions
- Read the README.md and documentation
- Open a new issue with the "question" label
- Contact: info@discoverycollective.com

## Recognition

Contributors will be recognized in:
- GitHub contributors list
- Release notes for significant contributions
- Project documentation

Thank you for contributing to the Dr. Marie Martin Video Showcase!
