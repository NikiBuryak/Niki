class Collection{
    constructor(url){
        this._url = url;
        this._list = [];
    }

    fetch(){
        return fetch(this._url)
            .then(res => res.json())
            .then((data) => this.setList(data))
    }
    setList(data){
        this._list = data;
    }
    getList(){
        return this._list;
    }
    get(id){
        return this._list.find((item) => item.id == id);
    }
    delete(id){
        fetch(this._url + '/' + id,{
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json'
            }
        })
        this._list= this._list.filter((item) => item.id !== id);
        return Promise.resolve();
    }
    update(student){
        const newStudent ={
            marks: this.getMarks(student)
        }
        fetch(this._url + '/' + student.dataset.id, {
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newStudent)
        })
        return Promise.resolve();
    }
    add(name){
        const item ={
            name,
            marks:[0,0,0,0,0,0,0,0,0,0],
        }
        return fetch(this._url, {
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        })
        .then(res => res.json())
        .then((res) =>{
            this._list.push(res);
            return res;
        })
    }
    getMarks(student){
        const marks =[];
        student = (Object.values( student.querySelectorAll('input')))
        student.map((el) => marks.push(el.value))
        return marks;
    
    }
}