# BFX HF Indicators

When writing [your own strategy](./creating_a_trading_method.md) you can use all indicators offered by the [bfx-hf-indicators package](https://www.npmjs.com/package/bfx-hf-indicators/). To update these indicators gekkos' provided method is used, keeping it clear what data is or can be fed into the indicators.

## Install

### Bash on Windows, OSX or Linux

Open your terminal. Then:

```
cd ~/gekko
npm i bfx-hf-indicators
```

## Example

There is a "DEMO_bfx-hf-indicators.js"-Strategy available which invokes every indicator and shows how to retrieve the according results. By default this strategy logs the results of the EMA to console. 

## HF Indicators

As of version 1.0.2 of this package it contains 44 indicators.

- Absolute True Range
- Acceleration
- Accumulation/Distribution
- Accumulative Swing Index
- Arnoud Legoux Moving Average
- Aroon
- Average Directional Index
- Awesome Oscillator
- Balance of Power
- Bollinger Bands
- Chaikin Money Flow
- Chaikin Oscillator
- Chande Momentum Oscillator
- Coppock Curve
- Detrended Price Oscillator
- Donchian Channels
- Ease of Movement
- Envelope
- Exponential Moving Average
- EMA Volume
- Know Sure Thing
- MACD
- Mass Index
- Momentum
- Net Volume
- On Balance Volume
- Price Channel
- Price Oscillator
- Price Volume Trend
- RSI
- Rate of Change
- Relative Vigor Index
- Relative Volatility Index
- Simple Moving Average
- Standard Deviation
- Stochastic
- Stochastic RSI
- TRIX
- True Strength Index
- VWAP
- Volume Oscillator
- Volume Weighted Moving Average
- Weighted Moving Average
- Williams %R
