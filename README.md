# PinPix

PinPix is a web application inspired by Pinterest, designed to allow users to discover, save, and share creative ideas.

## Key Features

- **User Authentication**: Secure login and signup functionality.
- **Pin Creation**: Users can create and upload their own pins with images and descriptions.
- **Boards**: Users can organize their pins into different boards for easy access.

## Technologies Used

- **Frontend**:
  - JavaScript
  - React
  - Redux
  - HTML5
  - CSS
- **Backend**:
  - Python
  - Flask
  - SQLAlchemy
  - Alembic
- **Database**: SQL

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/philliam-fancyson/PinPix.git
   cd PinPix
   ```

2. **Install dependencies**:
   ```bash
   # For the backend
   pip install -r requirements.txt

   # For the frontend
   cd client
   npm install
   ```

3. **Set up the database**:
   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

5. **Run the application**:
   ```bash
   pipenv shell
   ```

   ```bash
   # Start the backend server
   flask run
   
   # Start the frontend development server
   cd react-vite
   npm start
   ```

## Usage

1. **Sign up or log in** to start creating and organizing your pins.
2. **Create boards** to categorize your pins.
3. **Add new pins** by uploading images and providing descriptions.
4. **Search and browse** to discover new ideas and inspirations.

## Contributing

If you'd like to contribute to PinPix, please fork the repository and use a feature branch. Pull requests are warmly welcome.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

