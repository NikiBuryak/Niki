class NewStudentFormView{
    static FORM_BTN_SELECTOR = '#addStudentBtn';
    static FORM_SELECTOR = '#student-form';
    static FORM_INPUT_SELECTOR = '#studentNameInput';
    static TRIGGER_SELECTOR = '#add-form'
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
        const inputValue = $(NewStudentFormView.FORM_INPUT_SELECTOR).val();
        if (this.isEmpty(inputValue)){
            console.log('Enter task')
        } else{
            this._options.submit(inputValue);
            $(NewStudentFormView.FORM_SELECTOR)[0].reset()
            this.removeForm(e)
        }
    }
    removeForm(e){
        e.target.remove();
        $(NewStudentFormView.TRIGGER_SELECTOR)[0].style.display = '';
    }
    isEmpty(value){
        return !value
    }

}