import React, { Component} from 'react';
import axios from 'axios';
import ReactInputDateMask from 'react-input-date-mask';
import { cpfMask } from './mask';
import DateInput from './date';
import Cookies from 'js-cookie';

export default class FormDataComponent extends Component {
    userData;

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            cpf: '',
            cep: '',
            dataFetch: [],
        }
        this.DateInput = this.DateInput.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeCPF = this.onChangeCPF.bind(this);
        this.onChangeCep = this.onChangeCep.bind(this);
        this.onFech = this.onFech.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        
    }
    DateInput(props) {
        return <ReactInputDateMask  mask='dd/mm/yyyy' showMaskOnFocus={true}  className={props.className} value={props.value} onChange={props.onChange} showMaskOnHover={true} />;
      
    }
    onChangeName(e) {
        this.setState({ name: e.target.value })
    }
    onChangeCPF(e) {
        this.setState({ cpf: cpfMask(e.target.value) })
    }

    onChangePhone(e) {
        this.setState({ phone: e.target.value })
    }

    onChangeCep(e) {
        this.setState({ cep: e.target.value })
    }

    async onFech(){
        const response = await axios.get(`https://viacep.com.br/ws/${this.state.cep}/json/`)
        this.setState({dataFetch: response.data})
    }
    componentDidMount() {
        this.userData = JSON.parse(localStorage.getItem('user'));

        if (localStorage.getItem('user')) {

            this.setState({
                name: this.userData.name,
                cpf: this.userData.cpf,
                date: this.userData.date,
                cep: this.userData.cep,
                dataFetch: this.userData.dataFetch,
            })
        } else {
            this.setState({
                name: '',
                cpf: '',
                cep: '',
                dataFetch: [],
                
            })
        }
    }

    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem('user', JSON.stringify(nextState));
        Cookies.set('user', JSON.stringify(nextState));
        
    }

    onSubmit(e) {
        e.preventDefault()
    }

    
    render() {
        return (
            <div className="container">
                <h1 className="text-center display-1">Test GCB</h1>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label className="">Name</label>
                        <input type="text" className="form-control" value={this.state.name} onChange={this.onChangeName} />
                    </div>
                    <div className="form-group ">
                        <label className="">CPF</label>
                        <input type="cpf" maxLength="14" className="form-control" value={this.state.cpf } onChange={this.onChangeCPF} />
                    </div>
                            
                   <div className="form-group">
                    <label htmlFor="">Data</label>
                    <DateInput className="form-control"/>
                   </div>

                    <div className="form-group ">
                        <label className="">CEP</label>
                        <input type="tel" className="form-control" value={this.state.cep} onChange={this.onChangeCep} onKeyUp={this.onFech}/>
                    </div>

                    <div className="form-group ">
                        <label className="">Logradouro</label>
                        <input type="tel" className="form-control" value={this.state.dataFetch.logradouro} />
                    </div>

                    <div className="form-group ">
                    <label className="">Bairro</label>
                    <input type="tel" className="form-control" value={this.state.dataFetch.bairro} />
                    </div>

                    <div className="form-group ">
                        <label className="">Localidade</label>
                        <input type="tel" className="form-control" value={this.state.dataFetch.localidade} />
                    </div>

                    <div className="form-group ">
                        <label className="">Estado</label>
                        <input type="tel" className="form-control" value={this.state.dataFetch.uf} />
                    </div>

                    <button type="submit" className="btn btn-primary btn-lg btn-block">Submit</button>
                </form>
            </div>
        )
    }
}
