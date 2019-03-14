import React, { Component } from 'react';
import Intro from './js/intro';
import './main.css';
import files from './js/imgSearch';
import 'bootstrap/dist/css/bootstrap.css';

const imgs=files.imgs;
const pdf=files.pdf;

class Main extends Component {
	constructor(props){
		super(props);
		let width=window.screen.width;
		let height=window.innerHeight;
		this.state=({
			windowHeight:height,
			windowWidth:width,
		});
		this.getSize=this.getSize.bind(this);
		this.updateSize();
	};
	
	
	updateSize(){
		window.addEventListener('resize', this.getSize);
	}
	getSize(){
		let width=window.screen.width;
		let height=window.innerHeight;
		this.setState({
			windowHeight:height,
			windowWidth:width,
		});
	}
	
	componentDidMount(){
		window.addEventListener('resize',this.getSize());
	}
	
	componentWillUnmount(){
		window.removeEventListener('resize',this.getSize());
	}
	
	cvShow(){
		var a=document.getElementById('fullCv');
		var b=document.getElementById('close');
		var c=1;
		a.style.opacity='0';
		a.style.display='block';
		this.cvInterval=setInterval(()=>{
			if(c<=40){
				a.style.opacity=0+c*0.025;
				c++
			}else{
				clearInterval(this.cvInterval);
				b.addEventListener('click', this.hideCv, false);
			}
		},40)
	}
	
	hideCv(e){
		var a=document.getElementById('fullCv');
		var c=1;
		this.cvInterval=setInterval(()=>{
			if(c<=40){
				a.style.opacity=1-c*0.025;
				c++
			}else{
				a.style.display='none';
				clearInterval(this.cvInterval);
			}
		},40)
	}
	
	render() {
		let windowHeight=this.state.windowHeight;
		return (
			<div className="container mt-5">	
				<div  id="fullCv" style={{position:'fixed', top:'3%', left:'3%', height:'94%', zIndex:5, width:'94%', display:'none'}}>
					<div  id="print" className="pointer" style={{position:'fixed', top:'3%', left:'22%', zIndex:10, width:'3%'}}>
						<a href={pdf.cv} target='_blank'>
							<img 
								alt=""
								src={imgs.printer} 
								style={{objectFit:'contain', height:'100%', width:'100%'}}
							/>
						</a>
					</div>
					<div  id="close" className="pointer" style={{position:'fixed', top:'3%', left:'75%', zIndex:10, width:'3%'}}>
						<img src={imgs.closeImg} alt="" style={{objectFit:'contain', height:'100%', width:'100%'}}/>
					</div>
					<img src={imgs.cvImg} alt="" style={{objectFit:'contain', height:'100%', width:'100%'}}/>
				</div>
				<div className="row">
					<div className="col-12 border" id="content">
						<div className="bg-light row shadow-lg rounded" id="welcome" style={{minHeight:windowHeight}}>
							<Intro />
						</div>
						<div className="bg-warning row" id="cv" style={{minHeight:windowHeight}}>
							<div className="col-12">
								<div className="row">
									<div className="col-12 mt-5 px-5">
										<p className="display-linebreak border text-center m-2 rounded">
										Hei, ja tervetuloa!{'\n'}Kiva, että herätin kiinnostuksesi! {'\n'} Alla on cv:ni, josta voit katsoa osaamistani myös paperilla. Tämän jälkeen löydät linkit tekemiini sovelluksiin. 
										</p>
										<div className="row">
											<div className="col-6 pointer">
												<img 
													src={imgs.cvImg} 
													alt=""
													style={{borderRadius:'5px',objectFit:'contain', width:'100%'}} 
													onClick={()=>{
														this.cvShow()
													}}/>
											</div>
											<div className="px-3 col-6">
												<div className="row" style={{height:'100%'}}> 
													<div className="col-12 border mb-2 justify-content-center" style={{height:'50%'}}> 
														<h3 className="text-center mt-2">Ravintoaine laskuri</h3>
														<img 
															className="d-block mx-auto mt-2 pointer"
															src={imgs.nutCo} 
															style={{borderRadius:'5px',objectFit:'contain', maxHeight:'120px'}}
															onClick={()=>{
																window.open('http://www.tuukkanisso.com/nutrition','_blank')
															}}
															/>
															<p>
															
															</p>
													</div>
													<div className="col-12 border justify-content-center" style={{height:'50%'}}> 
														<h3 className="text-center mt-2">Nopeuspeli</h3>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			);
		}
	}

export default Main;
