# Matrix RobotJury

Matrix RobotJury is at the forefront of revolutionizing the scientific publication process. By harnessing the power of artificial intelligence, ReactJS, Python, and Snowflake, this application aims to automate the evaluation of scientific articles, determining their suitability for publication. It seeks to optimize the peer review process, making it more efficient, unbiased, and accessible.

## Project Overview

- **Frontend**: Built with ReactJS for a responsive and user-friendly interface.
- **Backend**: Utilizes Python to process and evaluate the data, interfacing with AI models.
- **Database**: Employs Snowflake for scalable, secure, and fast data storage and retrieval.
- **AI Evaluation**: Leverages advanced AI techniques to assess the quality and relevance of scientific articles.

## Features (Planned and Current)

- **Article Submission**: Users can submit articles for evaluation.
- **AI-Powered Review**: Articles are automatically reviewed based on criteria set by the scientific community.
- **Feedback Mechanism**: Submitters receive detailed feedback on the acceptance or rejection of their articles.
- **Admin Panel**: For managing the submission and review process.

## Getting Started

> Note: The project is currently in development, and setup instructions will evolve.

### Prerequisites

- Node.js and npm
- Python 3.9
- Access to a Snowflake instance

### Setup

1. Clone the repository:
   ```
   git clone https://github.com/zakariabouachra/Matrix_RobotJury.git
   ```
2. Install frontend dependencies:
   ```
   cd Matrix_RobotJury/GUI
   npm install
   ```
3. Set up the backend environment and install dependencies:
   ```
   cd ../API_REST
   pip install -r requirements.txt
   ```
4. Configure your Snowflake connection in the backend application.

### Running the Application

- Start the frontend application:
  ```
  npm start
  ```
- Run the backend server:
  ```bash
  python app.py
  ```

## Contribution

Matrix RobotJury is an open project, and contributions are welcome. Feel free to fork the repository, make improvements, and submit a pull request.

## License

This project is licensed under the [Apache License](LICENSE).
