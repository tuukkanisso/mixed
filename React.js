/* 	How to get own Instagram feed and animate the scroll from tp to bottom and back
	Starts at line 121 */

import React, { Component } from 'react';
import files from './imgSearch';
import jsonPics from './myPics';
import 'fetch-jsonp/build/fetch-jsonp';

const imgs=files.imgs;
const instaImgs=[];
let list=[];

class Intro extends Component{
	constructor(){
		super();
		this.state=({
			list:[],
			sOg:true,
			asc:true,
			fromHover:false,
			fromClick:false,
		});
		this.instagramPosts=this.instagramPosts.bind(this);
		this.animationClick=this.animationClick.bind(this);
		this.myHover=this.myHover.bind(this);
	}
	
	componentDidMount(){
		this.instagramPosts();
		this.myHover();
	}
	
	social(whereTo){
		window.open('http://'+whereTo+'.com/'+ /*USERNAME*/ +,'_blank');
	}
	
	myHover(){
		var a=document.getElementById('myIntro');
		a.addEventListener('click',()=>{
			var click=this.state.fromClick;
			this.setState({
				fromHover:false,
				fromClick:!click,
			});
			if(this.state.fromClick===true){
				this.showMe(a);
			}else{
				this.hideMe(a);
			}

			clearTimeout(this.showTotal);
		});		
		a.addEventListener('mouseover',()=>{
				var x=document.getElementById('myCareer');
				x.style.display='none';
				a.style.color='initial';
		});		
		a.addEventListener('mouseleave',()=>{
			if(this.state.fromClick===false){
				var x=document.getElementById('myCareer');
				x.style.display='initial';
				a.style.color='#ffffff';
			}
		});		
	}
	
	showMe(a){
		var b=document.getElementsByClassName('text-hider');
		b[0].style.display='none';
		a.style.maxHeight='1200px';
		a.style.color='initial';
	}
	
	hideMe(a){
		var b=document.getElementsByClassName('text-hider');
		b[0].style.display='initial';
		a.style.maxHeight='300px';
		a.style.color='#ffffff';
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
		var pos=b.style.top;
		if(pos!==''){
			pos=parseInt(pos);
		}
		if(this.state.sOg===true){
			var asc=this.state.asc;
			this.setState({asc:!asc});
			this.instaInterval=setInterval(()=>{
				if(asc===true){
					pos=pos-3;
				}else{
					pos=pos+3;
				}
				var bTop=b.offsetTop;
				b.style.top=pos+'px';
				if(pos<-topHeight||pos>0){
					asc=!asc;
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
		const token = //ACCESSTOKEN;
		
		fetchData(base+'?access_token='+token)
		.then(data => {
			for(var i in data.data){
				instaImgs.push(data.data[i]);
			}
			list=instaImgs.map((imgurl, index)=>
			{	
				var caption=imgurl.caption.text;
				return <div key={index}><div className="w-100 my-2 pointer position-relative"><div className="instaImage bg-dark" style={{zIndex:'50'}}><img alt="" className="w-100 p-0 rounded border" src={imgurl.images.low_resolution.url}/></div><div style={{overflowY:'hidden', zIndex:'-1', position:'absolute', height:'100%', top:'0'}}><div className="p-4" style={{position:'relative', transform:'translateY(10%)'}}><p className="text-dark text-center" style={{maxHeight:'100%'}}>{caption}</p></div></div></div></div>
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
					<h2 className="text-center">Tuukka Nisso</h2>
				</div>
			</div>
			<div className="display-linebreak row mb-2" style={{height:'100%'}}>
				<div className="col-8">
					<div className="row m-auto">
						<div className="col-12 pl-5 pointer" id="myIntro" style={{maxHeight:'300px', overflowY:'hidden', overflowX:'hidden', color:'#ffffff'}}>
							<div className="row bg-grey rounded">
								<div id="myCareer" style={{width:'100%', height:'100%', zIndex:'500', position:'absolute'}}> 
									<img alt="" src={imgs.code} className="rounded" style={{width:'100%', height:'100%', objectFit:'cover', opacity:'0.8', zIndex:'500', position:'absolute'}}/>
									<h3 className="imgClick" style={{position:'absolute', zIndex:'500', top:'50%',left:'30%', transform:'translate(-50%,-50%)'}}>Click to see more!</h3>
								</div>
								<div className="col-12">
									<p>
										Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean efficitur lobortis condimentum. Phasellus finibus sodales tellus nec finibus. Etiam quis felis arcu. Cras elementum hendrerit blandit. Aliquam viverra mi velit, non tincidunt nunc iaculis vel. Maecenas lobortis velit vel quam vehicula tincidunt. In rutrum bibendum porta. Donec mollis erat laoreet eros molestie dignissim. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec aliquam faucibus elementum. In ornare semper tellus, id laoreet diam. Proin ante tortor, lobortis eget ultricies vitae, porta non erat. Duis nec malesuada purus.
										{'\n'}{'\n'}
										Ut ac massa et est posuere congue. Nullam mattis mi velit, ac posuere ante gravida in. Maecenas sollicitudin dui et malesuada vehicula. Sed suscipit ipsum vel porttitor dictum. Duis vel laoreet libero. Etiam pharetra quis turpis eu auctor. Suspendisse ultricies libero risus. Phasellus aliquet augue quis maximus semper.
										{'\n'}{'\n'}
										Donec sodales accumsan justo iaculis ullamcorper. Nam congue eget est id bibendum. Pellentesque nunc magna, pretium et diam quis, pellentesque lobortis dui. Curabitur porttitor venenatis metus, a tristique sem pretium et. Curabitur quis ante dictum, pellentesque tortor at, efficitur nulla. Sed feugiat libero quis ex luctus, pretium consequat nulla mollis. Donec est ligula, venenatis at erat sit amet, ultricies rhoncus nisi. Sed hendrerit, ante a ullamcorper venenatis, lacus metus condimentum nisi, vel cursus ligula massa sed velit. Nulla ultricies condimentum felis, non tempor sem lobortis sed. Morbi maximus nibh sed posuere tempus. Aenean nec sapien ex. Curabitur pharetra metus quis nisi mollis, sit amet sodales sapien vestibulum.
									</p>
								</div>
								<div className="text-hider-grey text-hider col-12" style={{position:'absolute', bottom:'0', height:'250px'}}></div>
							</div>
						</div>
						<div className="col-12 pl-5 mt-2 pointer" id="myIntroAthletics" style={{maxHeight:'300px', overflowY:'hidden', overflowX:'hidden', color:'#ffffff'}}>
							<div className="row bg-grey rounded">
								<img src={imgs.code} className="rounded" id="myAthletics" alt="" style={{width:'100%', height:'100%', objectFit:'cover', opacity:'0.5', zIndex:'500', position:'absolute'}}/>
								<div className="col-12">
									<p>
										Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean efficitur lobortis condimentum. Phasellus finibus sodales tellus nec finibus. Etiam quis felis arcu. Cras elementum hendrerit blandit. Aliquam viverra mi velit, non tincidunt nunc iaculis vel. Maecenas lobortis velit vel quam vehicula tincidunt. In rutrum bibendum porta. Donec mollis erat laoreet eros molestie dignissim. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec aliquam faucibus elementum. In ornare semper tellus, id laoreet diam. Proin ante tortor, lobortis eget ultricies vitae, porta non erat. Duis nec malesuada purus.
										{'\n'}{'\n'}
										Ut ac massa et est posuere congue. Nullam mattis mi velit, ac posuere ante gravida in. Maecenas sollicitudin dui et malesuada vehicula. Sed suscipit ipsum vel porttitor dictum. Duis vel laoreet libero. Etiam pharetra quis turpis eu auctor. Suspendisse ultricies libero risus. Phasellus aliquet augue quis maximus semper.
										{'\n'}{'\n'}
										Donec sodales accumsan justo iaculis ullamcorper. Nam congue eget est id bibendum. Pellentesque nunc magna, pretium et diam quis, pellentesque lobortis dui. Curabitur porttitor venenatis metus, a tristique sem pretium et. Curabitur quis ante dictum, pellentesque tortor at, efficitur nulla. Sed feugiat libero quis ex luctus, pretium consequat nulla mollis. Donec est ligula, venenatis at erat sit amet, ultricies rhoncus nisi. Sed hendrerit, ante a ullamcorper venenatis, lacus metus condimentum nisi, vel cursus ligula massa sed velit. Nulla ultricies condimentum felis, non tempor sem lobortis sed. Morbi maximus nibh sed posuere tempus. Aenean nec sapien ex. Curabitur pharetra metus quis nisi mollis, sit amet sodales sapien vestibulum.
									</p>
								</div>
								<div className="text-hider-grey text-hider col-12" style={{position:'absolute', bottom:'0', height:'250px'}}></div>
							</div>
						</div>
					</div>
				</div>
				<div className="col-4">
					<div style={{height:height-100+'px',maxHeight:'750px',overflowY:'hidden'}}>
					<div id="instaContainer">
						<div id="instafeed" style={{position:'relative'}}>
							{this.state.list}
						</div>
					</div>
					</div>
					<div className="row justify-content-center">
						<div className="col-4">
							<img 
								className="pointer"
								src={imgs.instagram}
								onClick={()=>{this.social('instagram')}}
							/>
						</div>
						<div className="col-4">
							<img 
								className="pointer"
								src={imgs.facebook}
								onClick={()=>{this.social('facebook')}}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
		)
	}
}
export  default Intro;
