import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import allFiles from './js/imgSearch';

const audioImgs=allFiles.allFiles;
const users=allFiles.users;

let audios={
	anna:audioImgs.moiAnna,
	aava:audioImgs.moiAava, 
	success:audioImgs.soundSuccess, 
	end:audioImgs.soundfile
	};
let imgs={
	start:audioImgs.start,
	stop:audioImgs.stop,
	target:audioImgs.target,
	speed:audioImgs.speed,
	img:audioImgs.img,
	aava:audioImgs.Aava,
	anna:audioImgs.Anna
};
let randSquares=[];
let pressedSquares=[];
let activeUser;

function switchUser(){
	var a=document.getElementsByClassName('userImage');
	var b=document.getElementsByClassName('userNames');
	var c=document.getElementsByClassName('userHead');
	var d=document.getElementById('gameSelect');
	var e=document.getElementById('speed');
	b[0].style.display='flex';
	d.style.display='none';
	e.style.display='none';
	for(var j=0;j<c.length;j++){
		c[j].style.display='flex';
	}
	for(var i=0;i<a.length;i++){
		a[i].style.display='flex';
	}
}

function getSizes(){
	let height=window.innerHeight;
	let	width=window.innerWidth;
	if(height>500){
		height=450;
	}
	return({
		preWidth:width,
		preHeight:height,
	});
}

function Square(props) {
	return (
		<button className={props.newClass} onClick={props.onClick} style={{ backgroundImage:props.bg, backgroundSize:'cover', height:props.height, maxHeight:props.maxHeight, minHeight:'175px', minWidth:'150px'}}>
			{props.value}
		</button>
	);
}

function showBoard(props){
	let hello=new Audio(audios[props]);
	var props2nd;
	var d=document.getElementById('gameSelect');
	d.style.display='flex';
	hello.play();
	for(var i in users){
		if(props!==users[i]){
			props2nd=users[i];
			var a=document.querySelector('.'+props2nd+',.user' );
			a.style.display='none';
		}
	}
	var b=document.getElementsByClassName('userImage');
	document.getElementById('gameSelect').style.display='flex';
	for(var j=b.length-1; j>=0; j--){
		b[j].style.display='none';
	};
	activeUser=props;
}

class Board extends React.Component {	

	constructor(props){
		super(props);
		var a="btn-success";
		var b="green";
		var c="url("+imgs.img+")";
		var width= window.innerWidth;
		var height= window.innerHeight;
		this.state={
			squares:[a,a,a,a,a],
			backgrounds:[b,b,b,b,b],
			backgroundImg:[c,c,c,c,c],
			random:false,
			blink:0,	
			width:width,
			height:height,
			count:0,
			time:0,
			game:'',
			activeUser:'',
			round:0,
			gameEnd:true,
		};
		this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
	}	
			
	showGame(name){
		this.setState({game:name});
		document.getElementById('gameSelect').style.display='none';
		document.getElementById('boardGame').style.display='flex';
		var a=document.getElementsByClassName('userNames');
		for(var i=0;i<a.length;i++){
			a[i].style.display='none';
		}
		document.getElementById('speed').style.display='flex';
	}	
	
	handleClick(i,time){
		const squaresHistory=this.state.squares.slice();
		const backgrounds=this.state.backgrounds.slice();
		let audio=new Audio(audios.success);
		var count=this.state.count;
		var j=pressedSquares.length;
		pressedSquares.push(i);
		if(this.state.game==='speed'){
			var a='btn-light';
			count++;
			if(j===randSquares.length){
				return
			}
			squaresHistory[i]=('btn-primary');
			backgrounds[i]=('blue');
			this.timeOutVol2=setTimeout(()=>{
				this.setState({
					squares:[a,a,a,a,a],
				})
			},150);
			if(pressedSquares[j]!==randSquares[j]){
				this.endGame()
				clearTimeout(this.timeOutVol2);
				return
			}
			this.setState({
				squares:squaresHistory,
				backgrounds:backgrounds,
				count:count,
			})
			audio.play();
		}else if(this.state.game==='target'){
			var pressed=pressedSquares[j];
			var q=randSquares.length-1;
			if(pressed===randSquares[q]){
				audio.play();
				squaresHistory[i]=('btn-primary');
				backgrounds[i]=('blue');
				this.setState({
					squares:squaresHistory,
					backgrounds:backgrounds,
					count:this.state.count+1,
				})
				this.renderSquare(i);
				this.gameBegin(true);
			}
		}
	}
	
	renderSquare(i) {
		return <Square
			height={this.state.width/5}
			maxHeight={this.state.height/2}
			color={this.state.backgrounds[i]}
			bg={this.state.backgroundImg[i]}
			newClass={"btn square hitSquare col-2 mx-1 my-1 "+this.state.squares[i]}
			onClick={()=>this.handleClick(i)}
			 />;
		}
	
	endGame(){
		if(this.state.gameEnd){
			return
		}
		this.setState({
			gameEnd:true,
		});
		let end=new Audio(audios.end);
		end.play();
		this.gameBegin(false)
		this.end=setInterval(()=>{
			var a=this.state.random ? 'btn-primary':'btn-warning';
			var b=this.state.random ? 'blue':'yellow';
			this.setState({
				squares:[a,a,a,a,a],
				backgrounds:[b,b,b,b,b],
				random:!this.state.random,
				blink:this.state.blink+1,
			})
			if(this.state.blink>=8){
				clearInterval(this.end);
				var c="url("+imgs.img+")";
				this.setState({
					blink:0,
					backgroundImg:[c,c,c,c,c],
				});
			}
		},300)
	}
	
	playGame(time){
		var stop=this.state.stop;
		const squares=this.state.squares.slice();
		const squaresOrg=this.state.squares.slice();
		const backgrounds=this.state.backgrounds.slice();
		const backgroundsOrg=this.state.backgrounds.slice();
		const backgroundImg=this.state.backgroundImg.slice();
		var b="url("+imgs[this.state.game]+")";
		var j=pressedSquares.length;
		var k=randSquares.length;
		var distance=k-j;
		var min=0;
		var max=4;
		var rand=min+(Math.random()*(max-min));
		rand=Math.round(rand);
		randSquares.push(rand);
		squares[rand]='btn-warning';
		backgrounds[rand]='yellow';
		backgroundImg[rand]="url("+imgs.img+")";
		this.setState({
			squares:squares,
			backgrounds:backgrounds,
			backgroundImg:backgroundImg,
			endGame:false,
		});
		if(this.state.game==='speed'&&stop!==true){
			if(distance>4){
				console.log(k+', '+j);
				console.log('qq');
				this.endGame();
				return
			}
			setTimeout(()=>{
				this.setState({
					squares:squaresOrg,
					backgrounds:backgroundsOrg,
					backgroundImg:[b,b,b,b,b],
				});
			},200);
			if(time!==0){
				var newSpeed=parseInt(time/1.02)
				this.gameBegin(true, newSpeed);
			}
		}else if(this.state.game==='target'&&stop!==true){
			this.renderSquare(rand);
			var newTime=0.75+(Math.random()*(2));
			newTime=Math.round(1500/newTime);
			this.whacking=setTimeout(()=>{
				this.setState({
					squares:squaresOrg,
					backgrounds:backgroundsOrg,
					backgroundImg:[b,b,b,b,b],
				});
				this.gameBegin(true);
			},newTime);
		}else{
			clearTimeout(this.timeOut);
			clearTimeout(this.whacking);
			this.setState({
				squares:squaresOrg,
				backgrounds:backgroundsOrg,
				backgroundImg:[b,b,b,b,b],
			});
		}
	}
	
	gameBegin(start, time, first=false){
		clearTimeout(this.timeOut);
		var a='btn-light';
		var b="url("+imgs.img+")";
		var ac=document.getElementById('start');
		var bc=document.getElementById('stop');
		if(start===true){
			this.setState({
				gameEnd:false,
			});
			b="url("+imgs[this.state.game]+")";
			if(first===true){
				var x=document.getElementsByClassName('board-row')[0].offsetTop;
				var y=document.getElementsByClassName('board-row')[0].style.height;
				y=y/2;
				window.scrollTo(0,x+y+25);
				ac.style.display='none';
				bc.style.display='flex';
				this.setState({
					stop:false,
					count:0,
					squares:[a,a,a,a,a],
					backgroundImg:[b,b,b,b,b],
				});
				randSquares=[];
				pressedSquares=[];
			};
			if(this.state.game==='speed'){
				this.timeOut=setTimeout(()=>{this.playGame(time)},time);			
			}else if(this.state.game==='target'){
				var round=randSquares.length;
				this.setState({
					round:round,
					squares:[a,a,a,a,a],
					backgroundImg:[b,b,b,b,b],
				})
				clearTimeout(this.whacking);
				if(round<100){
					this.timeOut=setTimeout(()=>{this.playGame()},250)
				}else{
					this.endGame();
					pressedSquares=[];
					randSquares=[];
				}
			}
		}else if(start===false){
			this.setState({
				squares:[a,a,a,a,a],
				backgroundImg:[b,b,b,b,b],
				stop:true,
			});
			ac.style.display='flex';
			bc.style.display='none';
			this.playGame();
		}
	}

	componentDidMount() {
		this.updateWindowDimensions();
		window.addEventListener('resize', this.updateWindowDimensions);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.updateWindowDimensions);
	}

	updateWindowDimensions() {
		let width=window.innerWidth;
		let height=window.innerHeight;
		if (height>600){
			height=500;
		}
		this.setState({ width: width, height: height });
	}
	
	render() {			
		document.getElementById('root').style.minHeight=window.innerHeight+'px';
		let status="Speed";
		if(this.state.game==='target'){
			status='Whack-me!';
		}
		let result=this.state.count;
		if(this.state.game==='target'){
			result=this.state.count+'/'+this.state.round;
		};
		return (
			<div id="boardGame" className="w-100 py-2">
				<div id="gameSelect" className="row justify-content-center" style={{display:'none'}}>
					<div className="col-5 playGame" 
						style={{height:this.state.height-150+'px', maxHeight:this.state.height+'px', width:'auto'}} 
						onClick={()=>{
							this.showGame('speed');
							}
						}>
						<img src={imgs.speed} alt='Whack' style={{width:'85%', objectFit:'contain', height:'85%'}}/>
					</div>
					<div className="col-5 offset-1 playGame" 
						style={{height:this.state.height-150+'px', width:'auto'}} 
						onClick={()=>{
							this.showGame('target');
							}
						}>
						<img src={imgs.target} alt='Target' style={{width:'85%', objectFit:'contain', height:'85%'}}/>
					</div>
				</div>
				<div id="speed" className="col-12 row" style={{display:'none',backgroundRepeat:'no-repeat', backgroundSize:'contain', backgroundImage:'url('+imgs[this.state.game]+')', backgroundPosition:'center'}}>
					<div className="hitRow col-12">
						<div className="status row">
							<div className="col-3 offset-4 text-center my-1"><h2>{status}</h2></div>
							<div className="col-2 offset-2 text-center my-1" style={{maxHeight:'50px'}} onClick={()=>{switchUser()}}>
								<img className="rounded border pointer" 
								src={imgs[activeUser]} 
								alt='Aava' style={{width:'100%', objectFit:'cover', height:'100%'}}/>
							</div>
						</div>
						<div className="board-row hitRow row justify-content-center">
							{this.renderSquare(0)}
							{this.renderSquare(1)}
							{this.renderSquare(2)}
							{this.renderSquare(3)}
							{this.renderSquare(4)}
						</div>
						<div className="startGame row justify-content-center mt-2">
							<div id="start"
								className="btn col-5 p-0 mx-1 mb-2 pointer border-success rounded" 
								style={{maxHeight:'100px'}} 
								onClick={()=>{
									this.gameBegin(true,1500,true)
								}} 
							>
								<img className="bg-success" src={imgs.start} alt='start' style={{width:'100%', objectFit:'contain', height:'100%'}}/>
							</div>
							<div id="stop"
								className="btn col-5 p-0 mx-1 mb-2 pointer border-danger rounded" 
								style={{maxHeight:'100px', display:'none'}} 
								onClick={()=>{
									this.gameBegin(false)
								}} 
							>
								<img className="bg-danger" src={imgs.stop} alt='stop' style={{width:'100%', objectFit:'contain', height:'100%'}}/>
							</div>
							<div className="btn col-5 mx-1 p-0 border-warning bg-warning rounded" style={{maxHeight:'100px'}}>
								<h1 className="my-4" > {result} </h1>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

class ChooseUser extends React.Component {
	constructor(){
		super();
		this.state=getSizes();
	}
	
	componentDidMount(){
		window.addEventListener('resize', ()=>{
			var sizes=getSizes();
			this.setState(sizes);
		});
	}
	
	render() {
		console.log(this.state.preHeight);
		return (
			<div className="chooseUser col-12">
				<div className="row justify-content-center">
					<div className="userNames col-11">
						<div className="row w-100 justify-content-center">
							<div className="justify-content-center userHead col-5 anna mx-1 text-center">
								<h1> Anna-Sofia </h1>
							</div>
							<div className="justify-content-center userHead col-5 aava mx-1 text-center">
								<h1> Aava </h1>
							</div>
						</div>
					</div>
					<div className="col-5 anna mx-1 user text-center" onClick={()=>{showBoard('anna')}}> 
						<div className="border rounded pointer userImage" style={{ height:this.state.preHeight-150+'px', maxHeight:this.state.preHeight+'px', width:'auto', backgroundRepeat:'no-repeat'}}>
							<img src={imgs.anna} alt='Anna-Sofia' style={{width:'100%', objectFit:'cover', height:'100%'}}/>
						</div>
					</div>
					<div className="col-5 aava mx-1 mb-2 user text-center" onClick={()=>{showBoard('aava')}}>
						<div className="border rounded pointer userImage" style={{height:this.state.preHeight-150+'px', maxHeight:this.state.preHeight+'px', width:'auto', backgroundRepeat:'no-repeat'}}>
							<img src={imgs.aava} alt='Aava' style={{width:'100%', objectFit:'cover', height:'100%'}}/>
						</div>						
					</div>
				</div>
			</div>
		)
	}
}

class Game extends React.Component {
	
	constructor(props){
		super(props);
		this.state={
			windowHeight:window.innerHeight,
		}
	}
	
	componentDidMount(){
		window.addEventListener('resize',()=>{
			this.setState({
				windowHeight:window.innerHeight,
			});
		})
	}
	
	render() {
		let h=this.state.windowHeight;
		return (
			<div style={{height:h, overflow:'hidden'}}>
				<div id="rootImg" style={{height:h}}></div>
				<div className="game hitRow container m-auto w-100" style={{position:'relative', top:h/2-200+'px', minHeight:'400px'}}
				>
					<div id="letsPlay" className="game-board row bg-secondary text-light border border-dark rounded shadow-lg">
						<ChooseUser />
						<Board />
					</div>
				</div>
			</div>
		);
	}
}

ReactDOM.render(<Game />, document.getElementById('root'));
