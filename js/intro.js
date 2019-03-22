import React, { Component } from 'react';
import reactLogo from '../logo.svg';
import files from './imgSearch';
import jsonPics from './myPics';
import 'fetch-jsonp/build/fetch-jsonp';

const imgs=files.imgs;
const instaImgs=[];
let list=[];
let textFiles=files.txt;

class Intro extends Component{
	constructor(){
		super();
		this.state=({
			list:[],
			sOg:true,
			asc:true,
			fromHover:false,
			fromClick:false,
			intro:'',
			windowWidth:window.innerWidth,
		});
		this.instagramPosts=this.instagramPosts.bind(this);
		this.animationClick=this.animationClick.bind(this);
		this.clickIntro=this.clickIntro.bind(this);
		this.myHover=this.myHover.bind(this);
		this.getIntro=this.getIntro.bind(this);
	}
	
	componentDidMount(){
		this.instagramPosts();
		this.myHover();
		this.showOff();
		this.getIntro();
	}
	
	showCv(){
		var a=document.getElementById('fullCv');
		a.style.display='block';
	}
	
	getIntro(){
		let intro=(url) =>{
			return fetch(url)
			.then(data=>{
				return data.text();
			})
			.then(text =>{
				this.setState({
					intro:text,
				})
			})
		}
		let athlete=(url) =>{
			return fetch(url)
			.then(data=>{
				return data.text();
			})
			.then(text =>{
				this.setState({
					athlete:text,
				});
			})
		};
		let accomplishments=(url) =>{
			return fetch(url)
			.then(data=>{
				return data.text();
			})
			.then(text =>{
				this.setState({
					accomplishments:text,
				});
			})
		};
		intro(textFiles.intro);
		athlete(textFiles.athlete);
		accomplishments(textFiles.accomplishments);
	}
	
	social(whereTo){
		if(whereTo==='linkedin'){
			window.open('http://www.linkedin.com/in/tuukka-nisso-a0386534/','_blank');
		}else{
			window.open('http://'+whereTo+'.com/tuukkanisso','_blank');
		}
	}

	clickIntro(e){
		if(e.path[0].id==='cvSpan'){
			return
		};
		var id;
		for(var i in e.path){
			if(e.path[i].classList.contains('introText')){
				id=e.path[i].id;
				break
			}
		}
		var a=document.getElementById(id);
		var b=document.getElementsByClassName('introText');
		for(var k=0;i<b.length;k++){
			if(b[k].id!==id){
				b[k].style.display='none';
			}
		};
		var click=this.state.fromClick;
		this.setState({
			fromHover:false,
			fromClick:!click,
		});
		if(this.state.fromClick===true){
			this.showMe(a, id);
		}else{
			this.hideMe(a);
		}
		clearTimeout(this.showTotal);
	};

	myHover(){
		var a=document.getElementsByClassName('introText');
		for(var i=0;i<a.length;i++){
			a[i].addEventListener('click',(e)=>{this.clickIntro(e)})
		}
	}
	
	hover(x){
		x.style.opacity='0';
		console.log('x');
	}

	leave(x){
		x.style.opacity='0.9';
	}
	
	showOff(){
		var a=document.getElementById('myCareer');
		var b=document.getElementById('myAthletics');
		var bT=document.getElementById('myIntroAthletics');
		var c=document.getElementById('instaContainer');
		var h=document.getElementsByClassName('imgClick');
		for(var j=0;j<h.length;j++){
			h[j].style.display='none';
		}		
		bT.style.opacity='0';
		c.style.opacity='0';
		var d=1;
		var way=true;
		var count=0;
		var showThings=setInterval(()=>{
			if(count%20===0){
				way=!way;
			};
			if(way===true){
				d=d+0.025;
			}else{
				d=d-0.025;
			}
			if(count<=120){
				a.style.opacity=d;
				if(count===120){
					h[0].style.display='none';
					a.addEventListener('mouseover', ()=>{this.hover(a)});
					a.addEventListener('mouseleave', ()=>{this.leave(a)});
				}
			}
			else if(count>120&&count<=240){
				bT.style.opacity='1';
				b.style.opacity=d;
				if(count===240){
					h[1].style.display='none';
					b.addEventListener('mouseover', ()=>{this.hover(b)});
					b.addEventListener('mouseleave', ()=>{this.leave(b)});
				}
			}else if(count>240&&count<=360){
				c.style.opacity=d;
				if(count===360){
					h[2].style.display='none';
				}
			}else{
				clearInterval(showThings);
			}
			count++
		},25)
	}
	
	showMe(a, id){
		var b=document.getElementsByClassName('text-hider');
		for(var k=0;k<b.length;k++){
			b[k].style.display='none';
		};
		a.style.maxHeight='initial';
		var c=document.getElementsByClassName('introText');
		var d=document.getElementsByClassName('introPic');
		for(var j=0;j<d.length;j++){
			d[j].style.display='none';
		}
		for(var i=0;i<c.length;i++){
			if(c[i].id!==id){
				c[i].style.display='none';
			}
		};
	}
	
	hideMe(a){
		var b=document.getElementsByClassName('text-hider');		
		for(var k=0;k<b.length;k++){
			b[k].style.display='initial';
		};
		a.style.maxHeight='50%';
		a.style.color='#ffffff';
		var c=document.getElementsByClassName('introText');;
		var d=document.getElementsByClassName('introPic');
		for(var j=0;j<d.length;j++){
			console.log(d[j]);
			d[j].style.display='initial';
		}
		for(var i=0;i<c.length;i++){
			c[i].style.display='block';
		};
	}
	
	animationClick(){
		var a=document.getElementById('instaContainer');
		a.removeEventListener('click',this.animationClick);
		var stopOrGo=!this.state.sOg;
		this.setState({
			sOg:stopOrGo,
			});
		this.startAnimating();
	}
	
	startAnimating(){
		var a=document.getElementById('instaContainer');
		var b=document.getElementById('instafeed');
		var c=a.parentNode;
		var topHeight=a.offsetHeight-c.offsetHeight;
		window.addEventListener('resize',()=>{
			this.setState({
				windowWidth:window.innerWidth,
			});
			topHeight=a.offsetHeight-c.offsetHeight;
		});
		var pos=b.style.top;
		if(pos!==''){
			pos=parseInt(pos);
		}
		if(this.state.sOg===true){
			var asc=this.state.asc;
			this.setState({asc:!asc});
			this.instaInterval=setInterval(()=>{
				var vertical=true;
				if(this.state.windowWidth<768){
					vertical=false;	
				}
				if(asc===true){
					pos=pos-3;
				}else{
					pos=pos+3;
				}
				if(vertical===true){
					b.style.top=pos+'px';
					if(b.style.left!=='0px'){
						pos=0;
					}
					b.style.left=0;
					if(pos<-topHeight||pos>0){
						asc=!asc;
					}
				}else{
					if(pos<-(this.state.list.length*150)||pos>0){
						asc=!asc;
					}
					if(b.style.top!=='0px'){
						pos=0;
					}
					b.style.top=0;
					b.style.left=pos+'px';
				}
			},40);
		}else{
			clearInterval(this.instaInterval);
		}
		a.addEventListener('click',this.animationClick)
	}
	
	instagramPosts(){
		const fetchData = (url) => {
			return fetch(url)
			.then(data => {
					if(data.ok){
						return data.json()
					}else{
						return jsonPics
					}
				}
			)
			.then(json => {
				if (json) {
					return Promise.resolve(json);
				} else {
					return Promise.reject(Error('json is undefined!'));
				}
			})
			.catch(error => { console.log(error);})
		}

		const base = 'https://api.instagram.com/v1/users/4332207348/media/recent/';
		const token = '4332207348.ea97ad5.a8f86d48515f473f8e779e59cda84388';
		
		//https://api.instagram.com/oauth/authorize/?client_id=CLIENT-ID&redirect_uri=REDIRECT-URI&response_type=token
		
		fetchData(base+'?access_token='+token)
		.then(data => {
			for(var i in data.data){
				instaImgs.push(data.data[i]);
			}
			list=instaImgs.map((imgurl, index)=>
			{	
				var caption=imgurl.caption.text;
				return <div key={index} style={{minWidth:'150px'}}><div className="w-100 my-2 pointer position-relative"><div className="instaImage bg-dark" style={{zIndex:'50'}}><img alt="" className="w-100 p-0 rounded border" src={imgurl.images.low_resolution.url}/></div><div style={{overflowY:'hidden', zIndex:'-1', position:'absolute', height:'100%', top:'0'}}><p className="text-dark text-center p-2 m-auto" style={{position:'relative', transform:'translate(0,-50%)', top:'50%', bottom:'50%', maxHeight:'100%', maxWidth:'100%', overflow:'hidden'}}>{caption}</p></div></div></div>
			}
			)
			this.setState({
				list:list
			});	
			setTimeout(()=>{this.startAnimating()},2000);
		})
		.catch(error => console.log(error));
	}
	
	render(){
		var height=window.innerHeight;
		return(
		<div id="introduction" className="col-12 my-2">
			<div className="sticky row">
				<div className="headerPage col-12 my-1">
					<div className="row text-center">
						<div className="col-12 col-md-8">
							<div className="row justify-content-center">
								<div>
									<h2>
										Tuukka						
										<img src={reactLogo}
											id="reactLogo"
											alt=""
											style={{height:'48px',width:'48px'}}
										/>
										Nisso
									</h2>
								</div>
							</div>
						</div>
						<div className="col-12 col-md-4">
							<img 
								className="pointer"
								src={imgs.instagram}
								alt="instagram"
								onClick={()=>{this.social('instagram')}}
							/>
							<img 
								className="pointer"
								src={imgs.facebook}
								alt="facebook"
								onClick={()=>{this.social('facebook')}}
							/>
							<img 
								className="pointer"
								src={imgs.github}
								alt="github"
								onClick={()=>{this.social('github')}}
							/>
							<img 
								className="pointer mx-1"
								src={imgs.linkedin}
								alt="linkedin"
								onClick={()=>{this.social('linkedin')}}
							/>
							<img 
								className="pointer"
								style={{height:'48px'}}
								src={imgs.nutCo}
								alt="nutCo"
								onClick={()=>{window.open('http://tuukkanisso.com/nutrition','_blank')}}
							/>
						</div>
					</div>
				</div>

			</div>
			<div className="display-linebreak row" style={{height:'75%'}}>
				<div className="col-12 col-md-8 mb-0">
					<div className="row m-auto text-light" style={{overflowY:'auto', maxHeight:height-175, height:'100%'}}>
						<div className="col-12 pointer introText" id="myIntro">
							<div className="row bg-grey rounded">
								<div id="myCareer" className="introPic pb-2"> 
									<img alt="" src={imgs.code} className="rounded" style={{width:'100%', height:'100%', objectFit:'cover', opacity:'0.8', zIndex:'500', position:'absolute'}}/>
									<h2 className="imgClick" style={{position:'absolute', zIndex:'500', top:'50%',left:'40%', transform:'translate(-50%,-50%)'}}>Developer</h2>
								</div>
								<div className="col-12 text-center">
									<h4 className="my-2"> Developerina </h4>
									<p>
									{this.state.intro}
									</p>
									<p>
									Katso myös <span id="cvSpan" className="font-weight-bold pointer" onClick={()=>{this.showCv()}}>cv:ni</span>
									</p>
								</div>
								<div className="text-hider-grey text-hider col-12" style={{position:'absolute', bottom:'0', height:'250px'}}></div>
							</div>
						</div>
						<div className="col-12 pt-2 pointer introText" id="myIntroAthletics">
							<div className="row bg-grey rounded">
								<div id="myAthletics" className="introPic">
									<img src={imgs.wrec} className="rounded" alt="" style={{width:'100%', height:'100%', objectFit:'cover', opacity:'0.5', zIndex:'500', position:'absolute'}}/>
									<h2 className="imgClick" data-title="Athlete" style={{position:'absolute', zIndex:'500', top:'50%',left:'40%', transform:'translate(-50%,-50%)'}}>Athlete</h2>
								</div>
								<div className="col-12 text-center">
									<h4 className="my-2"> Urheilijana </h4>
									<p>
										{this.state.athlete}
									</p>
									<p className="text-left">
										{this.state.accomplishments}
									</p>
								</div>
								<div className="text-hider-grey text-hider col-12" style={{position:'absolute', bottom:'0', height:'250px'}}></div>
							</div>
						</div>
					</div>
				</div>
				<div className="col-12 col-md-4 mb-0">
					<div style={{height:'100%',maxHeight:height-175+'px', width:'100%',overflow:'hidden'}}>
						<div id="instaContainer">
							<div id="instafeed" className="d-flex flex-md-column flex-row" style={{minHeight:'150px', position:'relative'}}>
								{this.state.list}
							</div>
							<h2 className="imgClick" data-title="Instagram" style={{position:'absolute', zIndex:'500', top:'50%',left:'40%', transform:'translate(-50%,-50%)'}}>Instagram</h2>
						</div>
					</div>
				</div>
			</div>
		</div>
		)
	}
}
export  default Intro;
