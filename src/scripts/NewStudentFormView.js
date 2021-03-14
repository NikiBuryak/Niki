import $ from "jquery";
import { FORM_SELECTOR, FORM_INPUT_SELECTOR, TRIGGER_SELECTOR} from './configs'
 

export default class NewStudentFormView{
   
    constructor(options){
        this._options = options
    }

    addTrigger(){
        return $(`<span id="add-form">+</span>`)
        .on('click', this.onTriggerClick.bind(this))
    }
    onTriggerClick(e){
        e.preventDefault();
        const thisElem  = e.target;
        this.replaceForm(thisElem)
        thisElem.style.display = "none";
        
    }
    replaceForm(element){
        const form = this.makeNewStudentForm()[0]
        element.parentElement.append(form)
        
    }
    makeNewStudentForm(){
        return $(
            `<form id=student-form>
            <input type="text" id="studentNameInput"/>
            <button id="addStudentBtn" class="u-full-width">Add</button>
            </form> `)
            .on('submit', this.onSubmitBtnClick.bind(this))
    }
    onSubmitBtnClick(e){
        e.preventDefault();
        const inputValue = $(FORM_INPUT_SELECTOR).val();
        if (this.isEmpty(inputValue)){
            console.log('Enter task')
        } else{
            this._options.submit(inputValue);
            $(FORM_SELECTOR)[0].reset()
            this.removeForm(e)
        }
    }
    removeForm(e){
        e.target.remove();
        $(TRIGGER_SELECTOR)[0].style.display = '';
    }
    isEmpty(value){
        return !value
    }

}
