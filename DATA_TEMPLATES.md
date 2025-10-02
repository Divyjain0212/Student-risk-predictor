# Student Data Upload Template

## CSV Format Examples

### 1. Students Data (students.csv)
```csv
studentId,name,email,course,year,semester,guardianEmail,guardianPhone
STU001,John Doe,john.doe@college.edu,Computer Science,2,1,john.guardian@email.com,+1234567890
STU002,Jane Smith,jane.smith@college.edu,Engineering,1,2,jane.guardian@email.com,+1234567891
STU003,Mike Johnson,mike.johnson@college.edu,Business,3,1,mike.guardian@email.com,+1234567892
```

### 2. Attendance Data (attendance.csv)
```csv
studentId,subject,totalClasses,attendedClasses,month,year
STU001,Mathematics,20,18,9,2023
STU001,Physics,22,16,9,2023
STU002,Engineering Drawing,18,17,9,2023
STU003,Business Studies,25,20,9,2023
```

### 3. Assessment Data (assessments.csv)
```csv
studentId,subject,assessmentType,maxScore,obtainedScore,attempts,submissionDate
STU001,Mathematics,quiz,100,85,1,2023-09-15
STU001,Physics,assignment,50,42,2,2023-09-20
STU002,Engineering Drawing,midterm,100,78,1,2023-09-18
STU003,Business Studies,project,100,92,1,2023-09-22
```

### 4. Fee Payment Data (fees.csv)
```csv
studentId,amount,dueDate,paidDate,semester,year
STU001,5000,2023-08-31,2023-08-25,1,2023
STU002,5500,2023-08-31,,1,2023
STU003,4800,2023-08-31,2023-09-05,1,2023
```

## Field Descriptions

### Students Data Fields
- **studentId**: Unique identifier for student (required)
- **name**: Full name of student (required)
- **email**: Student's email address (required)
- **course**: Course/program name (required)
- **year**: Academic year (1-4, required)
- **semester**: Current semester (1-2, required)
- **guardianEmail**: Guardian's email for notifications (optional)
- **guardianPhone**: Guardian's contact number (optional)

### Attendance Data Fields
- **studentId**: Must match existing student ID (required)
- **subject**: Subject/course name (required)
- **totalClasses**: Total classes conducted (required)
- **attendedClasses**: Classes attended by student (required)
- **month**: Month (1-12, required)
- **year**: Year (YYYY, required)

### Assessment Data Fields
- **studentId**: Must match existing student ID (required)
- **subject**: Subject name (required)
- **assessmentType**: Type of assessment (quiz/assignment/midterm/final/project)
- **maxScore**: Maximum possible score (required)
- **obtainedScore**: Score achieved by student (required)
- **attempts**: Number of attempts (default: 1)
- **submissionDate**: Date of submission (YYYY-MM-DD format)

### Fee Payment Data Fields
- **studentId**: Must match existing student ID (required)
- **amount**: Fee amount in dollars (required)
- **dueDate**: Payment due date (YYYY-MM-DD, required)
- **paidDate**: Actual payment date (YYYY-MM-DD, optional)
- **semester**: Semester for which fee is applicable (required)
- **year**: Academic year (YYYY, required)

## Data Validation Rules

### Required Fields
- All fields marked as (required) must have values
- Empty cells in required fields will cause row rejection

### Data Types
- **Numbers**: Must be valid integers or decimals
- **Dates**: Must be in YYYY-MM-DD format
- **Email**: Must be valid email format
- **Phone**: Can include + and - characters

### Business Rules
- **attendedClasses** cannot exceed **totalClasses**
- **obtainedScore** cannot exceed **maxScore**
- **year** must be between 1-4 for students
- **semester** must be 1 or 2
- **assessmentType** must be one of: quiz, assignment, midterm, final, project

## Sample Data for Testing

Use these sample records to test the system:

### Sample Students
```csv
studentId,name,email,course,year,semester,guardianEmail,guardianPhone
TEST001,Alice Johnson,alice@test.edu,Computer Science,2,1,alice.parent@email.com,+1234567890
TEST002,Bob Wilson,bob@test.edu,Engineering,1,1,bob.parent@email.com,+1234567891
TEST003,Carol Brown,carol@test.edu,Business,3,2,carol.parent@email.com,+1234567892
TEST004,David Lee,david@test.edu,Mathematics,2,1,david.parent@email.com,+1234567893
TEST005,Eva Garcia,eva@test.edu,Physics,1,2,eva.parent@email.com,+1234567894
```

This sample includes students with varying risk profiles for testing the prediction system.

## Upload Process

1. **Prepare Data**: Format your data according to the templates above
2. **Validate**: Check data against validation rules
3. **Upload**: Use the system's upload interface
4. **Review**: Check the upload summary for any errors
5. **Process**: Allow system to calculate risk scores

## Common Issues and Solutions

### Upload Errors
- **"Invalid file format"**: Ensure file is CSV or Excel format
- **"Missing required fields"**: Check all required columns are present
- **"Invalid student ID"**: Ensure student exists before uploading related data

### Data Quality Issues
- **Low data completeness**: Aim for >90% field completion
- **Duplicate records**: System will automatically deduplicate based on key fields
- **Inconsistent formats**: Use consistent date and number formats

## Best Practices

1. **Start with Students**: Always upload student data first
2. **Incremental Updates**: Upload data regularly rather than in large batches
3. **Data Quality**: Validate data before upload
4. **Backup**: Keep copies of original data files
5. **Monitor**: Check upload reports for any issues

For technical support with data uploads, contact the system administrator.