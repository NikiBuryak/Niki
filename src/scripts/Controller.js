const API_URL = 'https://5dd3d5ba8b5e080014dc4bfa.mockapi.io/students/';
const STUDENT_SELECTOR = '.student';
class Controller{
    constructor($conteiner){
        this.$conteiner = $conteiner;
        this.studentsCollection = new Collection(API_URL);
        this.studentsCollection.fetch()
        .then(() => this.renderList());
        
        this.studentsListView = new StudentsView({
            delete: (id) => this.deleteStudent(id),
            tune: (student) => this.tuneStudent(student),
        });
        this.newFormStudent = new NewStudentFormView({
            submit:(name) => this.onSubmit(name)
        })
        this.studentsListView.appendTo(this.$conteiner);
    }
    deleteStudent(id){
        this.studentsCollection.delete(id)
        .then(() => this.studentsListView.removeElement(id))
    }

    tuneStudent(student){
        this.studentsCollection.update(student)
        .then(() => this.studentsListView.renderStudent(student))
    }
    onSubmit(name){
        this.studentsCollection.add(name)
        .then(res => this.studentsListView.appendStudent(res))
    }

    renderList(){
        this.studentsListView.renderStudents(this.studentsCollection.getList());
        this.newStudentForm = this.newFormStudent.addTrigger();
        this.$conteiner.after(this.newStudentForm[0]);
    }


}