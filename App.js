import React, { Component } from 'react';
import { StatusBar, ImageBackground, View, Text, TextInput, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Switches from 'react-native-switches';
import LinearGradient from 'react-native-linear-gradient';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import AwesomeAlert from 'react-native-awesome-alerts';
// import { AdMobBanner } from 'react-native-admob'

import Firebase from './Firebase.js';
import i18n from "./i18n.js";
i18n.setI18nConfig();

var languages = [
  { label: 'English', value: 'en' },
  { label: 'Italiana', value: 'it' },
  { label: 'Española', value: 'ge' },
  { label: '中文', value: 'cn' },
  { label: 'हिन्दी', value: 'hi' }
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: 'en',
      splash: false,
      feverOn: false,
      coughOn: false,
      breathOn: false,
      helpOn: false,
      name: null,
      errorName: null,
      showAlert: false,
      alertText: null
    };
  }

  changeLanguage(language) {
    i18n.setLocale(language)
    this.setState({ language: language });
  }

  onStart() {
    this.setState({ splash: true })
  }

  showAlert() {
    this.setState({
      showAlert: true
    });
  };

  hideAlert() {
    this.setState({
      showAlert: false
    });
  };

  confirmAlert() {
    const { feverOn, coughOn, breathOn, helpOn } = this.state
    Firebase.database.ref('users').push({
      fever: (feverOn) ? "YES" : "NO",
      cough: (coughOn) ? "YES" : "NO",
      breath: (breathOn) ? "YES" : "NO",
      help: (helpOn) ? "YES" : "NO",
      name: this.name,
      address: this.address,
      country: this.country,
      phone_number: this.phone
    });
    this.hideAlert();
    this.setState({
      splash: true,
      feverOn: false,
      coughOn: false,
      breathOn: false,
      helpOn: false
    });
    this.name = null;
    this.address = null;
    this.country = null;
    this.phone = null;
  }

  doTest() {
    const { coughOn, breathOn } = this.state;
    if (this.name == undefined) {
      this._name.focus();
      alert(i18n.translate("Enter your name"))
    } else if (this.address == undefined) {
      this._address.focus();
      alert(i18n.translate("Enter your address"))
    } else if (this.country == undefined) {
      this._country.focus();
      alert(i18n.translate("Enter your country"))
    } else if (this.phone == undefined) {
      this._phone.focus();
      alert(i18n.translate("Enter your phone number"))
    } else {
      this.showAlert();
    }
  }

  goBack() {
    this.setState({
      splash: false,
      feverOn: false,
      coughOn: false,
      breathOn: false,
      helpOn: false,
      name: null,
      errorName: null,
      showAlert: false,
      alertText: null
    });
  }

  render() {
    if (!this.state.splash) {
      return (
        <ImageBackground
          source={require('./bg.jpg')}
          style={styles.background}
        >
          <StatusBar hidden />
          <LinearGradient
            start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }}
            colors={['#06074150', '#060741']}
            style={styles.gradient}
          />
          <ScrollView style={styles.scroll}>
            <View style={{ alignItems: 'center' }}>
              {/* <Text style={{ color: 'white', fontSize: 22, fontWeight: '900', marginBottom: 20 }}>Select language</Text> */}
              <RadioForm
                animation={true}
              >
                {
                  languages.map((obj, i) => (
                    <RadioButton labelHorizontal={true} key={i} style={{ marginTop: 8 }}>
                      <RadioButtonInput
                        obj={obj}
                        index={i}
                        isSelected={this.state.language === obj.value}
                        borderWidth={2}
                        buttonOuterColor={this.state.language === obj.value ? '#59F6f3' : '#59F6f3'}
                        buttonInnerColor={this.state.language === obj.value ? '#FFF' : '#FFFFFF'}
                        buttonSize={10}
                        buttonOuterSize={20}
                        buttonWrapStyle={{ marginLeft: 10 }}
                        onPress={() => this.changeLanguage(obj.value)}
                      />
                      <RadioButtonLabel
                        obj={obj}
                        index={i}
                        labelHorizontal={true}
                        labelStyle={{ fontSize: 20, color: '#FFFFFF' }}
                        onPress={() => this.changeLanguage(obj.value)}
                      />
                    </RadioButton>
                  ))
                }
              </RadioForm>
            </View>
            <View style={{ width: '100%', alignItems: 'center', marginTop: 80 }}>
              <TouchableOpacity style={[styles.button, { width: '70%', bottom: 50 }]} onPress={() => this.onStart()}>
                <Text style={{ color: 'white', fontSize: 15, fontWeight: '600' }}>{i18n.translate("Get Started").toUpperCase()}</Text>
              </TouchableOpacity></View>
          </ScrollView>
        </ImageBackground>
      )
    } else {
      const { feverOn, coughOn, breathOn, helpOn, showAlert } = this.state
      return (
        <ImageBackground
          source={require('./bg2.jpg')}
          style={styles.background}>
          <StatusBar hidden />
          <LinearGradient
            start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }}
            colors={['#06074150', '#060741']}
            style={styles.gradient}
          />
          <View style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: 8, padding: 8 }}>
              <TouchableOpacity onPress={() => this.goBack()}>
                <Image source={require('./back.png')} style={styles.back}></Image>
              </TouchableOpacity>
              <Text style={styles.title}>{i18n.translate("CORONA SELF TEST").toUpperCase()}</Text>
              <View></View>
            </View>
            <KeyboardAwareScrollView
              // style={styles.scroll}
              ref={(view) => { this.scrollView = view }}>
              <View style={styles.row}>
                <Text style={styles.text}>{i18n.translate("Do you feel fever?")}</Text>
                <Switches
                  shape={'pill'}
                  onChange={() => this.setState({ feverOn: !feverOn })}
                  value={this.state.feverOn} textOff={i18n.translate("NO")}
                  textOn={i18n.translate("YES")}
                  sliderWidth={80}
                  sliderHeight={32}
                  colorSwitchOff={'#ccc'}
                  colorSwitchOn={'#54c340'}
                  colorTextOff={'black'}
                  colorTextOn={'white'}
                />
              </View>
              <View style={styles.row}>
                <Text style={styles.text}>{i18n.translate("Do you have dry cough?")}</Text>
                <Switches
                  shape={'pill'}
                  onChange={() => this.setState({ coughOn: !coughOn })}
                  value={this.state.coughOn} textOn={i18n.translate("YES")}
                  textOff={i18n.translate("NO")}
                  sliderWidth={80}
                  sliderHeight={32}
                  colorSwitchOff={'#ccc'}
                  colorSwitchOn={'#54c340'}
                  colorTextOff={'black'}
                  colorTextOn={'white'}
                />
              </View>
              <View style={styles.row}>
                <Text style={styles.text}>{i18n.translate("Can you hold your breath for 10 seconds?")}</Text>
                <Switches
                  shape={'pill'}
                  onChange={() => this.setState({ breathOn: !breathOn })}
                  value={this.state.breathOn} textOn={i18n.translate("YES")}
                  textOff={i18n.translate("NO")}
                  sliderWidth={80}
                  sliderHeight={32}
                  colorSwitchOff={'#ccc'}
                  colorSwitchOn={'#54c340'}
                  colorTextOff={'black'}
                  colorTextOn={'white'}
                />
              </View>
              <View style={styles.row}>
                <Text style={styles.text}>{i18n.translate("Do you need help?")}</Text>
                <Switches
                  shape={'pill'}
                  onChange={() => this.setState({ helpOn: !helpOn })}
                  value={this.state.helpOn} textOn={i18n.translate("YES")}
                  textOff={i18n.translate("NO")}
                  sliderWidth={80}
                  sliderHeight={32}
                  colorSwitchOff={'#ccc'}
                  colorSwitchOn={'#54c340'}
                  colorTextOff={'black'}
                  colorTextOn={'white'}
                />
              </View>
              <View style={styles.row}>
                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginTop: 20 }}>{i18n.translate("Enter your information")}</Text>
              </View>
              <View style={{ width: '100%', alignItems: 'center' }}>
                <TextInput style={styles.input} placeholder={i18n.translate("Name")} placeholderTextColor={'lightgrey'} returnKeyType='next' keyboardType="name-phone-pad" onChangeText={(text) => this.name = text} ref={(el) => this._name = el} value={this.name} />
                <TextInput style={styles.input} placeholder={i18n.translate("Address")} placeholderTextColor={'lightgrey'} onChangeText={(text) => this.address = text} ref={(el) => this._address = el} value={this.address} />
                <TextInput style={styles.input} placeholder={i18n.translate("Country")} placeholderTextColor={'lightgrey'} onChangeText={(text) => this.country = text} ref={(el) => this._country = el} value={this.country} />
                <TextInput style={styles.input} placeholder={i18n.translate("Phone number")} placeholderTextColor={'lightgrey'} returnKeyType="done" keyboardType="phone-pad" onChangeText={(text) => this.phone = text} ref={(el) => this._phone = el} value={this.phone} />

                <TouchableOpacity style={styles.button} onPress={() => this.doTest()}>
                  <Text style={{ color: 'white', fontSize: 15, fontWeight: '600' }}>{i18n.translate("Test")}</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAwareScrollView>
            <View style={styles.ads}>
              {/* <AdMobBanner
                adSize="smartBanner"
                adUnitID="ca-app-pub-5488053662540753/4518461523"
                testDevices={[AdMobBanner.simulatorId]}
              // onAdFailedToLoad={error => console.error(error)}
              /> */}
            </View>
          </View>
          <AwesomeAlert
            show={showAlert}
            showProgress={false}
            title={(coughOn && breathOn) ? i18n.translate("Please get Tested") : i18n.translate("Please take care at home")}
            message={i18n.translate("Drink warm water and steam every 2 hours")}
            closeOnTouchOutside={false}
            closeOnHardwareBackPress={false}
            showCancelButton={false}
            showConfirmButton={true}
            confirmText="OK"
            confirmButtonColor="#df1f60"
            titleStyle={{ fontSize: 24, fontWeight: 'bold' }}
            messageStyle={{ fontSize: 18, fontWeight: 'bold' }}
            contentStyle={{ alignItems: 'center' }}
            onConfirmPressed={() => {
              this.confirmAlert();
            }}
          />
        </ImageBackground>
      )
    }
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center'
  },
  gradient: {
    flex: 1,
    alignItems: 'center'
  },
  outer: {
    flex: 1,
    backgroundColor: '#060741'
  },
  container: {
    paddingTop: 40,
    paddingLeft: 16,
    paddingRight: 16
  },
  row: {
    flexDirection: 'row',
    width: '90%',
    alignItems: 'center',
    padding: 8,
  },
  title: {
    fontSize: 24,
    color: 'white'
  },
  text: {
    width: '80%',
    fontSize: 18,
    color: '#ccc',
    margin: 8
  },
  input: {
    height: 40,
    width: '90%',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginTop: 10,
    fontSize: 16,
    color: 'lightgrey'
  },
  scroll: {
    position: 'absolute',
    width: '80%',
    top: '50%',
    paddingLeft: 8,
    paddingRight: 8,
    marginBottom: 8
  },
  ads: {
    // backgroundColor: 'white',
    height: 64,
    // marginBottom: 8
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 50,
    width: '90%',
    backgroundColor: '#df1f60',
    height: 45,
    borderRadius: 10
  },
  back: {
    width: 24,
    height: 16,
    marginLeft: 8
  }
})

export default App;