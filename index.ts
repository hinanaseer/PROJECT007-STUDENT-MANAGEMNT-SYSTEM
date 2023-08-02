import inquirer from 'inquirer';

interface Course {
  code: string;
  name: string;
  tuitionFee: number;
}

interface Student {
  name: string;
  age: number;
  contact: string;
  id: string;
  courses: Course[];
}

class StudentManagementSystem {
  private students: Student[] = [];
  private courseCounter: number = 1;

  private generateStudentID(): string {
    return (Math.floor(10000 + Math.random() * 90000)).toString();
  }

  private async addStudent(): Promise<void> {
    const { name, age, contact } = await inquirer.prompt([
      { type: 'input', name: 'name', message: 'Enter student name:' },
      { type: 'number', name: 'age', message: 'Enter student age:' },
      { type: 'input', name: 'contact', message: 'Enter contact information:' },
    ]);

    const id = this.generateStudentID();
    const student: Student = { name, age, contact, id, courses: [] };
    this.students.push(student);

    console.log(`Student added successfully! ID: ${id}`);
  }

  private async enrollStudent(): Promise<void> {
    const { studentID, courseCode } = await inquirer.prompt([
      { type: 'input', name: 'studentID', message: 'Enter student ID:' },
      { type: 'input', name: 'courseCode', message: 'Enter course code:' },
    ]);

    const student = this.students.find((s) => s.id === studentID);
    if (!student) {
      console.log('Student not found!');
      return;
    }

    const course = this.courses.find((c) => c.code === courseCode);
    if (!course) {
      console.log('Course not found!');
      return;
    }

    student.courses.push(course);
    console.log('Student enrolled in the course!');
  }

  private async viewStudentStatus(): Promise<void> {
    const { studentID } = await inquirer.prompt({
      type: 'input',
      name: 'studentID',
      message: 'Enter student ID:',
    });

    const student = this.students.find((s) => s.id === studentID);
    if (!student) {
      console.log('Student not found!');
      return;
    }

    console.log('*** Student Status ***');
    console.log('Name:', student.name);
    console.log('ID:', student.id);
    console.log('Courses Enrolled:');
    student.courses.forEach((course) => {
      console.log(`- ${course.name} (${course.code}) - Tuition Fee: $${course.tuitionFee}`);
    });
    console.log('**********************');
  }

  private async showMainMenu(): Promise<void> {
    const { action } = await inquirer.prompt({
      type: 'list',
      name: 'action',
      message: 'What do you want to do?',
      choices: ['Add Student', 'Enroll Student', 'View Student Status', 'Exit'],
    });

    switch (action) {
      case 'Add Student':
        await this.addStudent();
        break;
      case 'Enroll Student':
        await this.enrollStudent();
        break;
      case 'View Student Status':
        await this.viewStudentStatus();
        break;
      case 'Exit':
        console.log('Goodbye!');
        return;
    }

    await this.showMainMenu();
  }

  private courses: Course[] = [
    { code: 'CS101', name: 'Computer Science 101', tuitionFee: 1500 },
    { code: 'MATH101', name: 'Mathematics 101', tuitionFee: 1200 },
    { code: 'ENG101', name: 'English 101', tuitionFee: 1000 },
  ];

  public async start(): Promise<void> {
    console.log('Welcome to Student Management System!');
    await this.showMainMenu();
  }
}

const studentManagementSystem = new StudentManagementSystem();
studentManagementSystem.start();
