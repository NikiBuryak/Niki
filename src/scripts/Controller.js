// import ListView from "./MainView";
import { API_URL } from "./configs";
import Collection from "./Collection";
import StudentsView from './StudentsView';
import FormView from './NewStudentFormView';

export class Controller{
    constructor($conteiner){
        this._$conteiner = $conteiner
        this.studentsCollection = new Collection(API_URL);
        this.studentsCollection.fetch()
        .then(() => this.renderList());
        this.studentsListView = new StudentsView({
            delete: (id) => this.deleteStudent(id),
            tune: (marks,id) => this.tuneStudent(marks,id),
        });
        this.newFormStudent = new FormView({
            submit:(name) => this.onSubmit(name)
        })
        this.studentsListView.appendTo(  this._$conteiner);
        
    }
    deleteStudent(id){
        this.studentsCollection.delete(id)
        .then(() =>   this.studentsListView.removeElement(id))
    }

    tuneStudent(marks,id){
        this.studentsCollection.update(marks,id)
        .then(() =>   this.studentsListView.renderStudent(marks))
    }
    onSubmit(name){
        this.studentsCollection.add(name)
        .then(res =>this.studentsListView.appendStudent(res))
    }

    renderList(){
        this.studentsListView.renderStudents(this.studentsCollection.getList());
        this.newStudentForm = this.newFormStudent.addTrigger();
        this._$conteiner.after(this.newStudentForm[0]);
    }
}
