import React, {Component} from   'react';
import ReactDOM from 'react-dom';
import './index.css';
import Preview from './Preview';
import CardsContainer from './CardsContainer';
import Cards from './Cards';
import Inputs from './Inputs';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: [],
            onane: "",
            content: "",
            selectedCard: null,
            creating: false,
            editing: false,
            titleVerification: "",
            
        }
    }
    // localStorage.setItem(key,value) for keeping data in local storage
    // localStorage.getItem(key) for getting data from local storage
    componentDidMount () {
        if(localStorage.getItem("cards")) {
            this.setState({cards: JSON.parse(localStorage.getItem("cards"))})
        } else {
            localStorage.setItem("cards", JSON.stringify([]))
        }
    }

    verification = () => {
        let returned = false;
        if(!this.state.onane) {
            this.setState({titleVerification: "your card needs a title",})
            returned = true;
        }
        return returned;
    }

    componentDidUpdate () {
        if(this.state.titleVerification) {
            setTimeout(() => {
                this.setState({titleVerification: ""})
            }, 2000)
        }
    }

    saveLocalStorage = (keyName, value) => {
        localStorage.setItem(keyName, JSON.stringify(value))
    }
    
    changeContentHandler = (event) => {
        this.setState({content: event.target.value})
    }

    changeTitleHandler = (event) => {
        this.setState({onane: event.target.value})
    }

    saveCardHandler = () => {
        if (this.verification()) return;
        const {onane, content, cards} = this.state;
        const card = {
            id: new Date(),
            onane: onane,
            content: content,
        };

        const updatedCards = [...cards, card];
        this.saveLocalStorage("cards",updatedCards);

        this.setState({
            cards: updatedCards,
            creating: false,
            onane:"",
            content:"",
        });
    }

    addCardHandler = () => {
        this.setState({creating: true});
    }
    
    edite = (cardId,cardOnane,cardContent) => {
        this.setState({
            selectedCard: cardId,
            onane:cardOnane,
            content:cardContent,
            editing: true ,
        });
    }

    saveEditingHandler = () => {
        if (this.verification()) return;
        const {onane, selectedCard, content, cards} = this.state;
        const updatedCards = [...cards];
        const cardIndex = cards.findIndex(card => card.id === selectedCard );
        updatedCards[cardIndex] = {
            id: selectedCard,
            onane: onane,
            content: content,
        };
        this.saveLocalStorage("cards",updatedCards);
        this.setState({
            cards: updatedCards,
            editing: false,
            onane: "",
            content: "",
        })
    }

    backEditeHandler = () => {
        this.setState({
            editing: false,
            onane: "",
            content: "", 
        })
    }

    backAddHandler = () => {
        this.setState({
            creating: false,
            onane: "",
            content: "", 
        })
    }

    deleteHandler = () => {
        const {cards, selectedCard} = this.state;
        const updatedCards = [...cards];
        const cardIndex = updatedCards.findIndex(card => card.id === selectedCard);
        updatedCards.splice(cardIndex, 1);
        this.saveLocalStorage("cards",updatedCards);
        this.setState({
            editing: false,
            content: "",
            onane: "",
            cards: updatedCards,
            selectedCard: null,
        });
    }

    getCards = () => {
        const {cards} = this.state;
        if(cards.length === 0) return <h4>you have no notes</h4> ;
        return (
            <>
                <CardsContainer>
                    {cards.map(card => 
                        <Cards 
                            key={card.id}
                            onane={card.onane}
                            content={card.content}
                            cardClicked={() => this.edite(card.id,card.onane,card.content)}
                        />
                    )}
                </CardsContainer>
            </>
        );
    }

    getEditeCards = () => {
        return (
            <div className=" width mx-auto">
                <h4>edite note</h4>
                <Inputs
                    changeContent={this.changeContentHandler}
                    changeTitle={this.changeTitleHandler}
                    onaneValue={this.state.onane}
                    contentValue={this.state.content}
                />
                <button type="button" className="btn btn-outline-danger my-3  center" onClick={this.saveEditingHandler }>edite</button>
                <button  type="button" className="btn btn-outline-danger my-3 center " onClick={this.backEditeHandler }>back</button>
                <button  type="button" className="btn btn-outline-danger my-3 center " onClick={this.deleteHandler }>delete</button>
            </div>
        );
    }

    getAddCard = () => {
        return (
            <div  className=" mx-auto width" >
                <h1>add note</h1>
                <Inputs
                    changeContent={this.changeContentHandler}
                    changeTitle={this.changeTitleHandler}
                    onaneValue={this.state.onane}
                    contentValue={this.state.content}
                />
                <button className="btn btn-outline-danger my-3 center" onClick={this.saveCardHandler }>save</button>
                <button className="btn btn-outline-danger my-3 center" onClick={this.backAddHandler }>back</button>
            </div>
        );
    }

    matching = () => {
        return this.state.creating ? this.getAddCard()
        : this.state.editing ? this.getEditeCards()
        : this.getCards();
    }
    
    render() {
        return (
            <>
                <header className=" text-center bg-danger">
                    <h4> JAGU notes</h4>
                        {
                        this.state.titleVerification && (
                            <div className="neededTitle ">
                                <h4>{this.state.titleVerification}</h4>
                            </div>
                        )} 
                </header>
                <section className="container-fluid  bg-dark text-white text-center ">
                    <button  className="btn btn-outline-danger my-3 center" onClick={this.addCardHandler}> + </button>
                    <Preview >
                        { this.matching()}
                    </Preview>
                </section>
            </>
        );
    }
}


ReactDOM.render(<App />, document.getElementById('root'))

