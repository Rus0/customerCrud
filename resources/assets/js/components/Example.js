import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Example extends Component {
    constructor(props){
        super(props);
        this.state={
            customers:[],
            isLoading:true,
            hidden:true,
            popupHidden:true,
            clickedCustomer:{
                id:'',
                name:'',
                lastnames:'',
                phone:'',
                email:'',
                card:''
            },
            inputNameHidden:true,
            inputName:'',
            addNewCustomerHidden:true,
            newCustomerName:'',
            newCustomerLastnames:'',
            newCustomerPhone:'',
            newCustomerEmail:'',
            newCustomerCard:''
        }


        this.handleDelete = this.handleDelete.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleActions = this.handleActions.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleNameButton = this.handleNameButton.bind(this)
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleAddNewClient  = this.handleAddNewClient.bind(this)
        this.addNewCustomerClose = this.addNewCustomerClose.bind(this)
    }

    componentDidMount(){
        var _this = this;
        var array = [];
        var i = 0;

        axios.get('/getcustomers')
            .then(function (response) {
                _this.setState({
                    isLoading:false,
                    customers:response.data.customers
                })
            })
            .catch(function (error) {
                console.log(error);
            });


    }
    handleDelete(id){
        console.log(id)
        var _this = this ;
        axios.post('/deleteCustomer', {
            id: id
        })
            .then(function (response) {
                _this.setState({
                    customers:response.data.customers,
                    popupHidden:true
                })
            } )
            .catch(function (error) {
                console.log(error);
            });
    }

    handleName(name){
        this.setState({
            selectedusername:name,
            modalIsHiden:false
        })
    }

    handleActions(id,name,lastnames,phone,email,card){

        this.setState({
            popupHidden:false,
            clickedCustomer:{
                id:id,
                name:name,
                lastnames:lastnames,
                phone:phone,
                email:email,
                card:card
            }
        }, () => console.log(this.state) )

    }

    handleClose (){
        this.setState({
            popupHidden:true
        })
    }

    handleUpdate(){
        this.setState({
            inputNameHidden:false
        })
    }
    handleNameButton(event){
        var _this = this;
        event.preventDefault();
        const object = {
            name : this.state.nameInput,
            id : this.state.clickedCustomer.id
        }
        axios.post('/updateCustomerName',object)
            .then( function (response){
                _this.setState({
                    clickedCustomer:
                        {
                            id:_this.state.clickedCustomer.id,
                            name:object.name,
                            lastnames:_this.state.clickedCustomer.lastnames,
                            phone:_this.state.clickedCustomer.phone,
                            email:_this.state.clickedCustomer.email,
                            card:_this.state.clickedCustomer.card

                        },
                    customers : response.data.customers,
                    inputNameHidden:true
                })



            })
    }

    handleNameChange(event){
        this.setState({
            nameInput:event.target.value
        })

    }

    handleAddNewClient(){
        this.setState({
            addNewCustomerHidden:false
        })
    }
    addNewCustomerClose(){
        this.setState({
            addNewCustomerHidden:true
        })
    }
    handleAddNewClientChangeName(event){
        this.setState({
            newCustomerName:event.target.value
        })
    }
    handleAddNewClientChangeLastnames(event){
        this.setState({
            newCustomerLastnames:event.target.value
        })
    }
    handleAddNewClientChangePhone(event){
        this.setState({
            newCustomerPhone:event.target.value
        })
    }
    handleAddNewClientChangeEmail(event){
        this.setState({
            newCustomerEmail:event.target.value
        })
    }
    handleAddNewClientChangeCard(event){
        this.setState({
            newCustomerCard:event.target.value
        })
    }
    handleAddNewCustomerSubmit(event){
        event.preventDefault();
        var _this = this;
        const newCustomer={
            name:this.state.newCustomerName,
            lastnames:this.state.newCustomerLastnames,
            phone:this.state.newCustomerPhone,
            email:this.state.newCustomerEmail,
            card:this.state.newCustomerCard
        }
        axios.post('addNewCustomer',newCustomer)
            .then( function(response){
                _this.setState({
                    customers:response.data.customers,
                    addNewCustomerHidden:true
                })
            })
    }

    render() {
        var addNewCustomerPopUp=''
        if(this.state.addNewCustomerHidden==false){
            addNewCustomerPopUp =
                <div className="cent">
                    <span className="close glyphicon glyphicon-remove-circle" onClick={this.addNewCustomerClose}> </span>
                    <div className="panel panel-primary">
                        <div className="panel-heading">Add new Customer</div>
                        <div className="panel-body">
                            <form onSubmit={this.handleAddNewCustomerSubmit.bind(this)}>
                                <input onChange={this.handleAddNewClientChangeName.bind(this)} className="inputAdd form-control" placeholder="name"/>
                                <input onChange={this.handleAddNewClientChangeLastnames.bind(this)} className="inputAdd form-control" placeholder="lastnames"/>
                                <input onChange={this.handleAddNewClientChangePhone.bind(this)} className="inputAdd form-control" placeholder="phone"/>
                                <input onChange={this.handleAddNewClientChangeEmail.bind(this)} className="inputAdd form-control" placeholder="email"/>
                                <input onChange={this.handleAddNewClientChangeCard.bind(this)} className="inputAdd form-control" placeholder="card"/>
                                <input className="btnOK btn btn-primary" type="submit" value="ok"/>
                            </form>
                        </div>
                    </div>
                </div>
        }
        var inputName =''
        if(this.state.inputNameHidden==false){
            inputName=  <div> <form onSubmit={this.handleNameButton}><input onChange={this.handleNameChange} className="form-control" placeholder="name"/><button  type="submit" className="btn btn-primary"> Save!</button></form> </div>
        }
        var loading = this.state.isLoading == true ? <h3>loading...</h3>:''
        var divCenter=''
        if(this.state.popupHidden == false){
            divCenter=
                <div className="cent">

                    <span className="close glyphicon glyphicon-remove-circle" onClick={this.handleClose.bind(this)}> </span>
                    <div className="panel panel-primary">
                        <div className="panel-heading">Customer informations   </div>
                        <div className="panel-body"><strong> Name: </strong> <p> {this.state.clickedCustomer.name} <span onClick={this.handleUpdate} className="updateCustomer glyphicon glyphicon-pencil"> </span> </p> {inputName} </div>
                        <div className="panel-body"><strong> Lastnames: </strong> <p> {this.state.clickedCustomer.lastnames} <span className="updateCustomer glyphicon glyphicon-pencil"> </span></p></div>
                        <div className="panel-body"><strong> Phone: </strong> <p> {this.state.clickedCustomer.phone} <span className="updateCustomer glyphicon glyphicon-pencil"> </span></p></div>
                        <div className="panel-body"><strong> Email: </strong> <p> {this.state.clickedCustomer.email} <span className="updateCustomer glyphicon glyphicon-pencil"> </span></p></div>
                        <div className="panel-body"><strong> Card: </strong> <p> {this.state.clickedCustomer.card} <span className="updateCustomer glyphicon glyphicon-pencil"> </span></p></div>
                        <span onClick={ () => this.handleDelete(this.state.clickedCustomer.id)} className="deleteCustomer" > <strong> Delete customer </strong> </span>
                    </div>

                </div>
        }else{
            divCenter= '';
        }
        return (
            <div className="container">
                <div onClick={this.handleAddNewClient}  className="addNew"><span className="glyphicon glyphicon-plus-sign"></span>Add New Customer</div>
                {divCenter}{addNewCustomerPopUp}
                <div hidden={this.state.modalIsHiden}>
                </div>
                {loading}
                <table className="table">
                    <thead className="thead-inverse">
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Lastnames</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Card</th>
                        <th>Actions </th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.customers.map((item,key) =>
                        <tr key={item.id}>
                            <th scope="row">{key+1}</th>
                            <td onClick={()=> this.handleName(item.name)  }>{item.name}</td>
                            <td>{item.lastnames}</td>
                            <td>{item.phone}</td>
                            <td>{item.email}</td>
                            <td>{item.card}</td>
                            <td onClick={ () => this.handleActions(item.id,item.name,item.lastnames,item.phone,item.email,item.card)}><span className="pointer glyphicon glyphicon-globe"> </span> </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        );
    }
}
