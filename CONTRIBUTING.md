# Contributing to Sam Croston Portfolio

Thank you for considering contributing to this project! 🎉

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/samcroston/portfolio/issues)
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Browser and OS information
   - Screenshots if applicable

### Suggesting Features

1. Check if the feature has already been suggested
2. Open an issue with:
   - Clear description of the feature
   - Why it would be useful
   - Possible implementation approach

### Pull Requests

1. Fork the repository
2. Create a new branch from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes
4. Test thoroughly:
   ```bash
   npm run build
   npm run verify
   ```
5. Commit with clear messages:
   ```bash
   git commit -m "feat: add amazing feature"
   ```
6. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
7. Open a Pull Request

## Development Guidelines

### Code Style

- Use TypeScript for new JavaScript code
- Follow existing code formatting
- Use meaningful variable and function names
- Add comments for complex logic

### Commit Messages

Follow conventional commits:
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `perf:` - Performance improvements
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

### Testing

Before submitting:
1. Run `npm run build` to ensure it builds successfully
2. Run `npm run verify` to pass all quality checks
3. Test in multiple browsers
4. Check responsive design on mobile

### Performance

- Keep bundle size minimal
- Optimize images before adding
- Test Lighthouse scores remain 100/100
- Ensure no console warnings or errors

## Questions?

Feel free to open an issue for any questions or reach out to hello@samcroston.com

Thank you for contributing! 🚀
