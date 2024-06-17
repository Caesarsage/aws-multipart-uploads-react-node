# File Upload with React, Node.js, and AWS S3 Multipart Uploads

## Overview
This project demonstrates a robust implementation of file uploads using React for the frontend, Node.js for the backend, and AWS S3 for storing files via multipart uploads. The application allows users to securely upload large files, leveraging AWS S3's capabilities for efficient storage and retrieval.


## Features
- **Frontend (React)**:
  - User-friendly interface for selecting and uploading files.
  - Progress indicators for multipart uploads.
  - Integration with AWS S3 for direct file uploads.

- **Backend (Node.js)**:
  - Express.js server handling file upload endpoints.
  - Efficient handling of large files through multipart upload API of AWS SDK.
  - Secure configuration using environment variables for AWS credentials and S3 bucket settings.

- **AWS S3 Integration**:
  - Utilizes AWS SDK to initiate, upload parts, and complete multipart uploads.
  - CORS configuration for allowing cross-origin uploads directly to S3 from the frontend.

## Technologies Used
- **Frontend**: React, Axios
- **Backend**: Node.js, Express.js
- **AWS Services**: S3 (Simple Storage Service)
- **Other Tools**: dotenv for environment variables, multer for handling multipart/form-data

## Installation
1. Clone the repository:
```bash
   git clone https://github.com/Caesarsage/aws-multipart-uploads-react-node.git
   cd aws-multipart-uploads-react-node
```

1. Install dependencies for frontend and backend:

```bash
   cd client
   npm install
   
   cd ../server
   npm install
```

3. Set up environment variables:
   - Create a `.env` file in the `backend` directory:
  
```bash
     AWS_ACCESS_KEY=your-aws-access-key
     AWS_SECRET_KEY=your-aws-secret-key
     AWS_REGION=your-aws-region
     S3_BUCKET=your-s3-bucket-name
  ```

4. Start the development servers:
   - In one terminal, start the frontend:

```bash
     cd client
     npm start
```
   - In another terminal, start the backend:
  
```bash
     cd server
     node app.js
```

1. Open your browser and navigate to `http://localhost:3001` to use the application.

## Contributions
Contributions to enhance and improve this project are welcome! Please fork the repository and submit a pull request with your proposed changes.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
