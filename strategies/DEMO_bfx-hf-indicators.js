/*
Written by Rainer M. Engel for the usage with gekko trading bot. Licencensed unter MIT.
https://github.com/jquery/jquery/blob/master/LICENSE.txt line 3 and following

v 0.1.0		- 44 indicators (from node package: bfx-hf-indicators)

THIS STRATEGY shows how all indicators below are used.
Install >gekko: npm i bfx-hf-indicators
---------------------------------------------------------------------------------
*/

// helpers
var _ 		= require('lodash');
var log 	= require('../core/log.js');
const util 	= require('util');

//fs 			= require('fs');	//to write log to file

//BFX-HF-INDICATORS
const { ATR } 				= require('bfx-hf-indicators');						//Absolute True Range
const { Acceleration } 		= require('bfx-hf-indicators');						//Acceleration
const { AccumDist } 		= require('bfx-hf-indicators');						//Accumulation/Distribution
const { ASI } 				= require('bfx-hf-indicators');						//Accumulative Swing Index
const { ALMA } 				= require('bfx-hf-indicators');						//Arnoud Legoux Moving Average
const { Aroon } 			= require('bfx-hf-indicators');						//Aroon
const { ADX } 				= require('bfx-hf-indicators');						//Average Directional Index
const { AO } 				= require('bfx-hf-indicators');						//Awesome Oscillator

const { BOP } 				= require('bfx-hf-indicators');						//Balance of Power
const { BollingerBands } 	= require('bfx-hf-indicators');						//Bollinger Bands

const { CMF } 				= require('bfx-hf-indicators');						//Chaikin Money Flow
const { ChaikinOsc } 		= require('bfx-hf-indicators');						//Chaikin Oscillator
const { ChandeMO } 			= require('bfx-hf-indicators');						//Chande Momentum Oscillator
const { CoppockCurve } 		= require('bfx-hf-indicators');						//Coppock Curve

const { DPO } 				= require('bfx-hf-indicators');						//Detrended Price Oscillator
const { DC } 				= require('bfx-hf-indicators');						//Donchian Channels

const { EOM } 				= require('bfx-hf-indicators');						//Ease of Movement
const { Envelope } 			= require('bfx-hf-indicators');						//Envelope
const { EMA } 				= require('bfx-hf-indicators');						//Exponential Moving Average
const { EMAVolume } 		= require('bfx-hf-indicators');						//EMA Volume

const { KST } 				= require('bfx-hf-indicators');						//Know Sure Thing
const { MACD } 				= require('bfx-hf-indicators');						//MACD
const { MassIndex } 		= require('bfx-hf-indicators');						//Mass Index
const { Momentum } 			= require('bfx-hf-indicators');						//Momentum
const { NetVolume } 		= require('bfx-hf-indicators');						//Net Volume
const { OBV } 				= require('bfx-hf-indicators');						//On Balance Volume

const { PC } 				= require('bfx-hf-indicators');						//Price Channel
const { PPO } 				= require('bfx-hf-indicators');						//Price Oscillator
const { PVT } 				= require('bfx-hf-indicators');						//Price Volume Trend

const { RSI } 				= require('bfx-hf-indicators');						//RSI
const { ROC } 				= require('bfx-hf-indicators');						//Rate of Change
const { RVGI } 				= require('bfx-hf-indicators');						//Relative Vigor Index
const { RVI } 				= require('bfx-hf-indicators');						//Relative Volatility Index

const { SMA } 				= require('bfx-hf-indicators');						//Simple Moving Average
const { StdDeviation } 		= require('bfx-hf-indicators');						//Standard Deviation
const { Stochastic } 		= require('bfx-hf-indicators');						//Stochastic
const { StochRSI } 			= require('bfx-hf-indicators');						//Stochastic RSI

const { TRIX } 				= require('bfx-hf-indicators');						//TRIX
const { TSI } 				= require('bfx-hf-indicators');						//True Strength Index

const { VWAP } 				= require('bfx-hf-indicators');						//VWAP (Volume Weighted Average Price)
const { VO } 				= require('bfx-hf-indicators');						//Volume Oscillator
const { VWMA } 				= require('bfx-hf-indicators');						//Volume Weighted Moving Average

const { WMA } 				= require('bfx-hf-indicators');						//Weighted Moving Average
const { WR } 				= require('bfx-hf-indicators');						//Williams %R



// let's create our own method
var method = {};

// prepare everything our method needs
method.init = function() {
	this.name = 'DEMO bfx-hf-indicators\n----------------------------------------------';	
	console.log(this.name);

	//INTERNAL EMA
	//this.addIndicator('ema', 'EMA', this.settings.weight);

	//BFX-HF-INDICATORS............................................................	//NAME									DEFAULT INPUT		ARGS
	this.atrBFX				= new ATR([this.settings.ATR]);							//Absolute True Range					candle OHLC			Period
	this.accelerationBFX	= new Acceleration([this.settings.Acceleration]);		//Acceleration							candle.close		Period
	this.accumDistBFX		= new AccumDist([this.settings.AccumDist]);				//Accumulation/Distribution				candle OHLC			Period
	this.asiBFX				= new ASI([this.settings.ASI]);							//Accumulative Swing Index				candle OHLC			Period
	this.almaBFX			= new ALMA([3, 0.56, 2]);  //20,0.89,6					//Arnoud Legoux Moving Average			candle.close		'Period', 'Offset', 'Sigma' 
	this.aroonBFX			= new Aroon([48]);					//default 14		//Aroon									candle.close		Period
	this.adxBFX				= new ADX([14, 14]);									//Average Directional Index				candle OHLC			Smoothing, Length
	this.aoBFX				= new AO([this.settings.AO]);							//Awesome Oscillator					candle OHLC			NO ARGS, LABEL PERIOD ?  !!!!!!!!!!!!!!!!!
	
	this.bopBFX				= new BOP([15]);										//Balance of Power						candle OHLC			NO ARGS
	this.bollingerBandsBFX	= new BollingerBands([20, 2]);							//Bollinger Bands						candle.close		'Period', 'Multiplier'
	
	this.cmfBFX				= new CMF([20]);										//Chaikin Money Flow					candle OHLC			Period
	this.chaikinOscBFX		= new ChaikinOsc([3, 10]);								//Chaikin Oscillator					candle OHLC			'Short Period', 'Long Period'
	this.chandeMOBFX		= new ChandeMO([9]);									//Chande Momentum Oscillator			candle OHLC			Period
	this.coppockCurveBFX	= new CoppockCurve([10, 14, 11]);						//Coppock Curve							candle.close		'WMA Length', 'Long RoC Length', 'Short RoC Length'

	this.dpoBFX				= new DPO([21]);										//Detrended Price Oscillator			candle.close		Period
	this.dcBFX				= new DC([20]);											//Donchian Channels						candle OHLC			Period
	
	this.eomBFX				= new EOM([10000, 14]);									//Ease of Movement						candle OHLC			'Divisor', 'Length'
	this.envelopeBFX		= new Envelope([20, 10]);								//Envelope								candle.close		'Length', 'Percent'
	this.emaBFX				= new EMA([20]);										//Exponential Moving Average			candle.close		Period
	this.emaVolumeBFX		= new EMAVolume([20]);									//EMA Volume							candle OHLC/Volume	Period
	
	this.kstBFX				= new KST([10, 15, 20, 30, 10, 10, 10, 15, 9]);			//Know Sure Thing						candle.close		'ROC A Period', 'ROC B Period', 'ROC C Period', 'ROC D Period', 'SMA A Period', 'SMA B Period', 'SMA C Period', 'SMA D Period', 'Signal Period'
	this.macdBFX			= new MACD([12, 26, 9]);								//MACD									candle.close		'Fast MA Period', 'Slow MA Period', 'Signal MA Period'
	this.massIndexBFX		= new MassIndex([10]);									//Mass Index							candle OHLC			Period
	this.momentumBFX		= new Momentum([10]);									//Momentum								candle.close		Period
	this.netVolumeBFX		= new NetVolume([20]);									//Net Volume							candle OHLC/Volume	NO ARGS
	this.obvBFX				= new OBV([20]);										//On Balance Volume						candle OHLC/Volume	NO ARGS

	this.pcBFX				= new PC([20, 1]);										//Price Channel							candle OHLC			'Period', 'Offset'
	this.ppoBFX				= new PPO([10, 21]);									//Price Oscillator						candle OHLC			'Short Period', 'Long Period' 
	this.pvtBFX				= new PVT([10]);										//Price Volume Trend					candle OHLC			NO ARGS
	
	this.rsiBFX				= new RSI([14]);										//RSI									candle.close		Period
	this.rocBFX				= new ROC([10]);										//Rate of Change						candle.close		Period
	this.rvgiBFX			= new RVGI([10]);										//Relative Vigor Index					candle OHLC			'rvi', 'signal'
	this.rviBFX				= new RVI([10]);										//Relative Volatility Index				candle.close		Period
	
	this.smaBFX				= new SMA([20]);										//Simple Moving Average					candle.close		Period
	this.stdDeviationBFX	= new StdDeviation([20]);								//Standard Deviation					candle.close		Period
	this.stochasticBFX		= new Stochastic([14, 3, 3]);							//Stochastic							candle OHLC			'Period', 'K Smoothing', 'D Smoothing'
	this.stochRsiBFX		= new StochRSI([14, 14, 3, 3]);							//Stochastic RSI						candle.close		'Length RSI', 'Length Stochastic', 'Stoch Smoothing', 'Signal Smoothing'
	
	this.trixBFX			= new TRIX([18]);										//TRIX									candle.close		Period
	this.tsiBFX				= new TSI([25, 13, 13]);								//True Strength Index					candle.close		'Long Smoothing', 'Short Smoothing', 'Signal Length'
	
	this.vwapBFX			= new VWAP([10]);										//VWAP (Volume Weighted Average Price)	candle OHLC/Volume	NO ARGS  <- part of gekko candle data
	this.voBFX				= new VO([5, 10]);										//Volume Oscillator						candle OHLC/Volume	'Short Period', 'Long Period' 
	this.vwmaBFX			= new VWMA([20]);										//Volume Weighted Moving Average		candle OHLC/Volume	Period
	
	this.wmaBFX				= new WMA([10]);										//Weighted Moving Average				candle.close		Period
	this.wrBFX				= new WR([14]);											//Williams %R							candle OHLC			Period

	/*//INFO on indicator
	console.log(util.inspect(PPO));
	console.log("");
	console.log("\tgetDataType: "+this.ppoBFX.getDataType());
	console.log("\tgetDataKey: "+this.ppoBFX.getDataKey());
	*/
	
	//for logging to file	
	//this.logDATA	= "D:/gekko-dev3/BFX-HF-INDICATOR/log_bfx-hf-indicators.txt"

	//candle counter
	this.counter 		= 0;
}



// what happens on every new candle?
method.update = function(candle) {
	// update indicators
	this.atrBFX.add({open: candle.open, high: candle.high, low: candle.low, close: candle.close, vol: candle.volume});				//Absolute True Range
	this.accelerationBFX.add(candle.close);																							//Acceleration
	this.accumDistBFX.add({open: candle.open, high: candle.high, low: candle.low, close: candle.close, vol: candle.volume});		//Accumulation/Distribution
	this.asiBFX.add({open: candle.open, high: candle.high, low: candle.low, close: candle.close, vol: candle.volume});				//Accumulative Swing Index
	this.almaBFX.add(candle.close);																									//Arnoud Legoux Moving Average
	this.aroonBFX.add(candle.close);																								//Aroon	
	this.adxBFX.add({open: candle.open, high: candle.high, low: candle.low, close: candle.close, vol: candle.volume});				//Average Directional Index				
	this.aoBFX.add({open: candle.open, high: candle.high, low: candle.low, close: candle.close, vol: candle.volume});				//Awesome Oscillator					
	
	this.bopBFX.add({open: candle.open, high: candle.high, low: candle.low, close: candle.close, vol: candle.volume});				//Balance of Power
	this.bollingerBandsBFX.add(candle.close);																						//Bollinger Bands

	this.cmfBFX.add({open: candle.open, high: candle.high, low: candle.low, close: candle.close, vol: candle.volume});				//Chaikin Money Flow					
	this.chaikinOscBFX.add({open: candle.open, high: candle.high, low: candle.low, close: candle.close, vol: candle.volume});		//Chaikin Oscillator					
	this.chandeMOBFX.add({open: candle.open, high: candle.high, low: candle.low, close: candle.close, vol: candle.volume});			//Chande Momentum Oscillator			
	this.coppockCurveBFX.add(candle.close);																							//Coppock Curve
	
	this.dpoBFX.add(candle.close);																									//Detrended Price Oscillator			
	this.dcBFX.add({open: candle.open, high: candle.high, low: candle.low, close: candle.close, vol: candle.volume});				//Donchian Channels		

	this.eomBFX.add({open: candle.open, high: candle.high, low: candle.low, close: candle.close, vol: candle.volume});				//Ease of Movement							
	this.envelopeBFX.add(candle.close);																								//Envelope									
	this.emaBFX.add(candle.close);																									//Exponential Moving Average					
	this.emaVolumeBFX.add({open: candle.open, high: candle.high, low: candle.low, close: candle.close, vol: candle.volume});		//EMA Volume							
	
	this.kstBFX.add(candle.close);																									//Know Sure Thing								
	this.macdBFX.add(candle.close);																									//MACD							
	this.massIndexBFX.add({open: candle.open, high: candle.high, low: candle.low, close: candle.close, vol: candle.volume});		//Mass Index								
	this.momentumBFX.add(candle.close);																								//Momentum									
	this.netVolumeBFX.add({open: candle.open, high: candle.high, low: candle.low, close: candle.close, vol: candle.volume});		//Net Volume							
	this.obvBFX.add({open: candle.open, high: candle.high, low: candle.low, close: candle.close, vol: candle.volume});				//On Balance Volume	

	this.pcBFX.add({open: candle.open, high: candle.high, low: candle.low, close: candle.close, vol: candle.volume});				//Price Channel						
	this.ppoBFX.add(candle.close);																									//Price Oscillator						
	this.pvtBFX.add({open: candle.open, high: candle.high, low: candle.low, close: candle.close, vol: candle.volume});				//Price Volume Trend				

	this.rsiBFX.add(candle.close);																									//RSI									
	this.rocBFX.add(candle.close);																									//Rate of Change						
	this.rvgiBFX.add({open: candle.open, high: candle.high, low: candle.low, close: candle.close, vol: candle.volume});				//Relative Vigor Index					
	this.rviBFX.add(candle.close);																									//Relative Volatility Index				

	this.smaBFX.add(candle.close);																									//Simple Moving Average				
	this.stdDeviationBFX.add(candle.close);																							//Standard Deviation				
	this.stochasticBFX.add({open: candle.open, high: candle.high, low: candle.low, close: candle.close, vol: candle.volume});		//Stochastic							
	this.stochRsiBFX.add(candle.close);																								//Stochastic RSI		

	this.trixBFX.add(candle.close);																									//TRIX									
	this.tsiBFX.add(candle.close);																									//True Strength Index				
	
	this.vwapBFX.add({open: candle.open, high: candle.high, low: candle.low, close: candle.close, vol: candle.volume});				//VWAP (Volume Weighted Average Price)	
	this.voBFX.add({open: candle.open, high: candle.high, low: candle.low, close: candle.close, vol: candle.volume});				//Volume Oscillator						
	this.vwmaBFX.add({open: candle.open, high: candle.high, low: candle.low, close: candle.close, vol: candle.volume});				//Volume Weighted Moving Average		
	
	this.wmaBFX.add(candle.close);																									//Weighted Moving Average			
	this.wrBFX.add({open: candle.open, high: candle.high, low: candle.low, close: candle.close, vol: candle.volume});				//Williams %R							
	
}


method.log = function() {
  //nothing
}


method.check = function(candle) {
	var price 			= candle.close;
	
	//INTERNAL EMA
	//var ema = this.indicators.ema.result;	
		
	//BFX-HF-INDICATORS (Results)..................................................
	var atrR 			= this.atrBFX.v();										//Absolute True Range	
	//console.log("Absolute True Range: "+atrR);									//FINE
	
	var accelerationR 	= this.accelerationBFX.v();								//Acceleration
	//console.log("Acceleration: "+accelerationR);									//FINE
	
	var accumDistR 		= this.accumDistBFX.v();								//Accumulation/Distribution
	//console.log("Accumulation/Distribution: "+accumDistR);						//FINE
	
	var asiR 			= this.asiBFX.v();										//Accumulative Swing Index
	//console.log("Accumulative Swing Index: "+asiR);								//FINE
	
	var almaR 			= this.almaBFX.v();										//Arnoud Legoux Moving Average
	//console.log("Arnoud Legoux Moving Average: "+almaR);							//FINE
		
	var aroonR 			= this.aroonBFX.v();									//Aroon
	//console.log("Aroon: 'up': "+aroonR['up']+", 'down': "+aroonR['down']);		//FINE
	
	var adxR			= this.adxBFX.v();										//Average Directional Index	
	//console.log("Average Directional Index: "+adxR);								//FINE
	
	var aoR				= this.aoBFX.v();										//Awesome Oscillator
	//console.log("Awesome Oscillator: "+aoR);										//FINE
	
	var bopR			= this.bopBFX.v();										//Balance of Power
	//console.log("Balance of Power: "+bopR);										//FINE
	
	var bBandsR			= this.bollingerBandsBFX.v();							//Bollinger Bands	
	//console.log("Bollinger Bands (top|middle|bottom): "+bBandsR['top']+"\t"+bBandsR['middle']+"\t"+bBandsR['bottom']);	//FINE

	var cmfR			= this.cmfBFX.v();										//Chaikin Money Flow					
	//console.log("Chaikin Money Flow: "+cmfR);										//FINE
	
	var chaikinOscR		= this.chaikinOscBFX.v();								//Chaikin Oscillator
	//console.log("Chaikin Oscillator: "+chaikinOscR);								//FINE	
	
	var chandeMOR		= this.chandeMOBFX.v();									//Chande Momentum Oscillator
	//console.log("Chande Momentum Oscillator: "+chandeMOR);						//FINE	
	
	var coppockCurveR 	= this.coppockCurveBFX.v();								//Coppock Curve
	//console.log("Coppock Curve: "+coppockCurveR);									//FINE

	var dpoR			= this.dpoBFX.v();										//Detrended Price Oscillator
	//console.log("Detrended Price Oscillator: "+dpoR);					//FINE	
	
	var dcR				= this.dcBFX.v();										//Donchian Channels
	//console.log("Donchian Channels (upper|middle|lower): "+dcR['upper']+"\t"+dcR['middle']+"\t"+dcR['lower']);	//FINE
	
	var eomR			= this.eomBFX.v();										//Ease of Movement							
	//console.log("Ease of Movement: "+eomR);										//FINE
	
	var envelopeR		= this.envelopeBFX.v();									//Envelope
	//console.log("Envelope (upper|basis|lower): "+envelopeR['upper']+"\t"+envelopeR['basis']+"\t"+envelopeR['lower']);	//FINE
	
	var emaR			= this.emaBFX.v();										//Exponential Moving Average
	console.log("Exponential Moving Average: "+emaR);							//FINE
	
	var emaVolumeR		= this.emaVolumeBFX.v();								//EMA Volume	
	//console.log("EMA Volume: "+emaVolumeR);										//FINE
	
	var kstR			= this.kstBFX.v();										//Know Sure Thing
	//console.log("Know Sure Thing (v|signal): "+kstR['v']+"\t"+kstR['signal']);	//FINE

	var macdR			= this.macdBFX.v();										//MACD	
	//console.log("MACD (macd|signal|histogram): "+macdR['macd']+"\t"+macdR['signal']+"\t"+macdR['histogram']);	//FINE
	
	var massIndexR		= this.massIndexBFX.v();								//Mass Index
	//console.log("Mass Index: "+massIndexR);										//FINE
	
	var momentumR		= this.momentumBFX.v();									//Momentum
	//console.log("Momentum: "+momentumR);											//FINE
	
	var netVolumeR		= this.netVolumeBFX.v();								//Net Volume
	//console.log("Net Volume: "+netVolumeR);										//FINE
	
	var obvR			= this.obvBFX.v();										//On Balance Volume
	//console.log("On Balance Volume: "+obvR);									//FINE

	var pcR				= this.pcBFX.v();										//Price Channel	
	//console.log("Price Channel (upper|lower|center): "+pcR['upper']+"\t"+pcR['lower']+"\t"+pcR['center']);	//FINE
	
	var ppoR			= this.ppoBFX.v();										//Price Oscillator
	//console.log("Price Oscillator: "+ppoR);										//FINE								
	
	var pvtR			= this.pvtBFX.v();										//Price Volume Trend
	//console.log("Price Volume Trend: "+pvtR);									//FINE

	var rsiR			= this.rsiBFX.v();										//RSI
	//console.log("RSI: "+rsiR);													//FINE
	
	var rocR			= this.rocBFX.v();										//Rate of Change
	//console.log("Rate of Change: "+rocR);										//FINE
	
	var rvgiR			= this.rvgiBFX.v();										//Relative Vigor Index	
	//console.log("Relative Vigor Index (rvi|signal): "+rvgiR['rvi']+"\t"+rvgiR['signal']);		//FINE
	
	var rviR			= this.rviBFX.v();										//Relative Volatility Index
	//console.log("Relative Volatility Index: "+rviR);							//FINE	

	var smaR			= this.smaBFX.v();										//Simple Moving Average
	//console.log("Simple Moving Average: "+smaR);								//FINE	
	
	var	stdDeviationR	= this.stdDeviationBFX.v();								//Standard Deviation
	//console.log("Standard Deviation: "+stdDeviationR);							//FINE
	
	var stochasticR		= this.stochasticBFX.v();								//Stochastic
	//console.log("Stochastic (k|d): "+stochasticR['k']+"\t"+stochasticR['d']);		//FINE
	
	var stochRsiR		= this.stochRsiBFX.v();									//Stochastic RSI
	//console.log("Stochastic RSI (v|signal): "+stochRsiR['v']+"\t"+stochRsiR['signal']);		//FINE		

	var trixR			= this.trixBFX.v();										//TRIX
	//console.log("TRIX: "+trixR);												//FINE
	
	var tsiR			= this.tsiBFX.v();										//True Strength Index
	//console.log("True Strength Index (v|signal): "+tsiR['v']+"\t"+tsiR['signal']);		//FINE	
	
	var vwapR			= this.vwapBFX.v();										//VWAP (Volume Weighted Average Price)	
	//console.log("VWAP (Volume Weighted Average Price): "+vwapR);				//FINE
	
	var voR				= this.voBFX.v();										//Volume Oscillator
	//console.log("Volume Oscillator: "+voR);									//FINE
	
	var vwmaR			= this.vwmaBFX.v();										//Volume Weighted Moving Average
	//console.log("Volume Weighted Moving Average: "+vwmaR);						//FINE

	var wmaR			= this.wmaBFX.v();										//Weighted Moving Average
	//console.log("Weighted Moving Average: "+wmaR);								//FINE
	
	var wrR				= this.wrBFX.v();										//Williams %R
	//console.log("Williams %R: "+wrR);											//FINE

	//console.log(util.inspect(macdR));
	
	
	/*
	//COLLECT VALUES 
	var logMessage	= ""+this.counter+"|"+price+"|"+atrR+"|"+accelerationR+"|"+accumDistR+"|"+asiR+"|"+almaR+"|"+aroonR['up']+"|"+aroonR['down']+"|"+adxR+"|"+aoR+"|"+bopR+"|"+bBandsR['top']+"|"+bBandsR['middle']+"|"+bBandsR['bottom']+"|"+cmfR+"|"+chaikinOscR+"|"+chandeMOR+"|"+coppockCurveR+"|"+dpoR+"|"+dcR['upper']+"|"+dcR['middle']+"|"+dcR['lower']+"|"+eomR+"|"+envelopeR['upper']+"|"+envelopeR['basis']+"|"+envelopeR['lower']+"|"+emaR+"|"+emaVolumeR+"|"+kstR['v']+"|"+kstR['signal']+"|"+macdR['macd']+"|"+macdR['signal']+"|"+macdR['histogram']+"|"+massIndexR+"|"+momentumR+"|"+netVolumeR+"|"+obvR+"|"+pcR['upper']+"|"+pcR['lower']+"|"+pcR['center']+"|"+ppoR+"|"+pvtR+"|"+rsiR+"|"+rocR+"|"+rvgiR['rvi']+"|"+rvgiR['signal']+"|"+rviR+"|"+smaR+"|"+stdDeviationR+"|"+stochasticR['k']+"|"+stochasticR['d']+"|"+stochRsiR['v']+"|"+stochRsiR['signal']+"|"+trixR+"|"+tsiR['v']+"|"+tsiR['signal']+"|"+vwapR+"|"+voR+"|"+vwmaR+"|"+wmaR+"|"+wrR;
	
	//WRITE TO FILE............................................................................
	fs.appendFile(this.logDATA, logMessage+"\n", function (err) {
	if (err) return console.log(err);
	//console.log('Something severe went wrong!');
	});//--------------------------------------------------------------------------------------
	*/

	//update candle counter
	this.counter++;
}

module.exports = method;
