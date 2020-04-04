import React, {Component} from 'react'
import Image from './Image'
import './Card.css'
import Options from './Options'

class Card extends Component {

    state = {
        word:'',
        cardPic:'',
        pcPic:'',
        pcScore:0,
        playerScore:0,
        pccardPic:'',
        playerDeck:[],
        pcDeck:[],
        pcCradDisplay:''
        
    
        

    }

    constructor(props){
        super(props);
        this.changeHandler = this.changeHandler.bind(this);
        this.buttonHandler = this.buttonHandler.bind(this);
        this.deckNumber = this.deckNumber.bind(this)
        this.deckType = this.deckType.bind(this)
        this.shuffle = this.shuffle.bind(this)
        this.reset = this.reset.bind(this)
        this.win = this.win.bind(this)
    }

    changeHandler(event) { //accept the data from input
        const data = event.target.value 
        this.setState({word:data}) }

    buttonHandler() { // use input data to make a cardPicture
        const cardfilename  = this.state.word + '.png'; //there was changes
        const pcfilename = this.state.pcCradDisplay + '.png'
        try {
            const image1 =  require( '../Assets/'+cardfilename);
            const image2 =  require( '../Assets/'+pcfilename);
            this.setState({cardPic:image1,pcPic:image2});
        } catch(e) {
            this.setState({cardPic:'',pcPic:'' })
        }
        this.win()
        
    }

    deckNumber() { // random shuffle to make the decks
        const HalfDeck = 26;
        for(let i=0;i<HalfDeck;i++) { //insert the numbers to the deck
            let ranPlayer = Math.floor(Math.random() * (14+1)); //14 is num of uniqe cards in deck
            let ranPc = Math.floor(Math.random() * (14+1));

            if(ranPlayer === 0 || ranPlayer === 1)
                ranPlayer = Math.floor(Math.random() * (14+1));
            if(ranPc === 0 || ranPc === 1)
                ranPc = Math.floor(Math.random() * (14+1));

            this.state.playerDeck.push(ranPlayer);
            this.state.pcDeck.push(ranPc);
            
        }
    }

    deckType() { // random choose the numbers card type
        this.deckNumber()
        const HalfDeck = 26;
        let items = [...this.state.pcDeck]
        let item = [...this.state.playerDeck]

        for(let i=0;i<HalfDeck;i++) {
            const middle = '_of_';
            const ranPlayer = Math.floor(Math.random() * (4 + 1)); //4 types of cards 
            const ranPc = Math.floor(Math.random() * (4 + 1));;

            switch(ranPc) { //assign each nuber in pcDeck their type
                case 1:
                    items[i] = this.state.pcDeck[i] +middle+'clubs'
                    ;break;
                case 2:
                    items[i] = this.state.pcDeck[i] +middle+'diamonds'
                    ;break;
                case 3:
                    items[i] = this.state.pcDeck[i] +middle+'hearts'
                    ;break;
                case 4:
                    items[i] = this.state.pcDeck[i] +middle+'spades'
                    ;break;
                default:  
                    items[i] = this.state.pcDeck[i] +middle+'spades';   
            }

            switch(ranPlayer) { //assign each nuber in playerDeck their type
                case 1:
                    item[i] = this.state.playerDeck[i] +middle+'clubs'
                    ;break;
                case 2:
                    item[i] = this.state.playerDeck[i] +middle+'diamonds'
                    ;break;
                case 3:
                    item[i] = this.state.playerDeck[i] +middle+'hearts'
                    ;break;
                case 4:
                    item[i] = this.state.playerDeck[i] +middle+'spades';
                    break;
                default:  
                    
                    item[i] = this.state.playerDeck[i] +middle+'spades';
            }
            
        }
        this.setState({playerDeck:item})
        this.setState({pcDeck:items})
    }

    reset() {
        this.setState({
            playerDeck:[],
            pcDeck:[]
        })
        this.state.playerDeck.length = 0;
        this.state.pcDeck.length = 0;
    }

    shuffle() {
        this.reset()
        this.deckType()
    }

    win() { //decise who wins
        let playerRandomCard = 0;
        let ranCard = Math.floor(Math.random() * (26+1)); //choose random card from pcDeck
        let pcCard = this.state.pcDeck[ranCard];
        let playerCard = this.state.word;

        if(this.state.playerDeck.includes(playerCard)) {
            if(pcCard > playerCard)  // also need to check  what to do in case of draw
                this.setState({pcScore:this.state.pcScore+1, pcCradDisplay:pcCard}) //there was changes
            if(pcCard < playerCard)
                this.setState({playerScore:this.state.playerScore+1})

            while(pcCard === playerCard) {// In the case of a draw, 
                //three cards must be drawn and the last card is compared between the card packs until there is no draw

                for(let i =0;i<3;i++) {//three times random and then how the card
                    ranCard = Math.floor(Math.random() * (26+1));
                    playerRandomCard = Math.floor(Math.random() * (26+1));
                } 
                pcCard = this.state.pcDeck[ranCard];
                playerCard = this.state.playerDeck[playerRandomCard];
                if(pcCard > playerCard)  // also need to check  what to do in case of draw
                    this.setState({pcScore:this.state.pcScore+1,pcCradDisplay:pcCard}) //there was changes
                if(pcCard < playerCard)
                    this.setState({playerScore:this.state.playerScore+1})
            }
        }
        
    }

    render() {
        return (
            <div className="Card">
                <input type='text' onChange={(event) => this.changeHandler(event)}  />
                <Image source={this.state.cardPic} />
                <Image source={this.state.pcPic} />
                <button className='button' type='button' onClick={this.buttonHandler}>submit</button>
                <button className='sufflebutton' type='button' onClick={this.shuffle}>shuffle</button>
                <Options deck ={this.state.playerDeck} />
            </div>
        );
    }
}

export default Card;
