class Decision{
    constructor(){
        this.listeners=[]
    }
    get no(){
        if(this.val!=undefined)
            return
        this.val=false
        this.not.yes
    }
    get yes(){
        if(this.val!=undefined)
            return
        this.val=true
        this.listeners.forEach(f=>f())
    }
    then(f){
        if(this.val==undefined)
            return this.listeners.push(f)
        if(this.val)
            f()
    }
    get not(){
        if(this._not)
            return this._not
        this._not=new Decision
        this._not._not=this
        this.then(()=>this._not.no)
        this._not.then(()=>this.no)
        return this._not
    }
    to(d){
        var to=new Decision
        this.not.then(()=>to.yes)
        d.then(()=>to.yes)
        this.then(()=>d.not.then(()=>to.no))
        to.not.then(()=>{this.yes;d.no})
        to.then(()=>{
            this.then(()=>d.yes)
            d.not.then(()=>this.no)
        })
        return to
    }
    and(d){
        var and=new Decision
        this.not.then(()=>and.no)
        d.not.then(()=>and.no)
        this.then(()=>d.then(()=>and.yes))
        and.not.then(()=>{
            this.then(()=>d.no)
            d.then(()=>this.no)
        })
        and.then(()=>{this.yes,d.yes})
        return and
    }
    or(d){
        var or=new Decision
        this.then(()=>or.yes)
        d.then(()=>or.yes)
        this.not.then(()=>d.not.then(()=>or.no))
        or.not.then(()=>{this.no;d.no})
        return or
    }
    iff(d){
        var iff=new Decision
        this.not.then(()=>d.not.then(()=>iff.yes))
        this.not.then(()=>d.then(()=>iff.no))
        this.then(()=>d.not.then(()=>iff.no))
        this.then(()=>d.then(()=>iff.yes))
        iff.not.then(()=>{
            this.then(()=>d.no)
            d.then(()=>this.no)
        })
        iff.then(()=>{
            this.then(()=>d.yes)
            d.then(()=>this.yes)
        })
        return iff
    }
}
