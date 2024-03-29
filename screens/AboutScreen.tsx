import * as React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { StyleSheet, Modal, Alert, TouchableHighlight, TouchableOpacity, Linking, Image, SafeAreaView } from 'react-native';
import { Text, View } from '../components/Themed';
import useColorScheme from '../hooks/useColorScheme';

export default function TabTwoScreen() {
  const [modalVisible, setModalVisible] = React.useState(false);
  const theme = useColorScheme();
  const themeColor = theme == 'dark' ? 'white' : 'black';
  const reverseThemeColor = theme == 'dark' ? 'black' : 'white';
  const ModalComponent = () => {
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <TouchableOpacity style={styles.centeredView} onPress={() => setModalVisible(false)}>
            <View style={{ ...styles.modalView, shadowColor: themeColor }}>
              <Text style={styles.modalText}>This is an unofficial, non-commercial, fan-made app and is NOT affiliated, endorsed or supported by Nintendo, Game Freak and The Pokémon Company in any way. Many images used in this app are copyrighted and are supported under fair use. Pokémon and Pokémon character names are trademarks of Nintendo. No copyright infringement intended.</Text>
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#280393" }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Close Notice</Text>
              </TouchableHighlight>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={{display: 'flex', alignItems: 'center'}}>
          <Image
            style={{ width: 300, height: 100, resizeMode: 'contain' }}
            source={require('./../assets/images/pokedex.png')}
          />
        </View>
        <Text style={styles.title}>Developer Note:</Text>
        <Text>
          Hi I created this app to share about how to build mobile apps using Expo/React Native on my YouTube Channel.
          Feel free to ask any questions regarding this app or contribute by sending pull request at Github repo of this project.
        </Text>
        <Text style={styles.title}>{"\n"}Do you want to learn how to make this app?</Text>
        <Text>Go watch the tutorial at 'Shawwal Muhammad' YouTube channel and don't forget to subscribe for more content like this. Press link below to learn how to create this app now!{"\n"}</Text>
        <View style={{
          display: 'flex',
          flexDirection: 'row',
          padding: 5
        }}>
          <TouchableOpacity style={{ flex: 1 }} onPress={() => Linking.openURL('https://www.youtube.com/channel/UCP_ueVbLEBk_FyZodKZQS4Q')}>
            <View style={{ ...styles.socialMedia, backgroundColor: '#FF0000' }}>
              <AntDesign size={30} color="white" name="youtube" />
              <Text style={{ color: 'white', fontWeight: 'bold', paddingLeft: 10 }}>Watch Tutorial</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{ flex: 1 }} onPress={() => Linking.openURL('https://github.com/shawwal')}>
            <View style={{ ...styles.socialMedia, backgroundColor: themeColor }}>
              <AntDesign size={30} color={reverseThemeColor} name="github" />
              <Text style={{ color: reverseThemeColor, fontWeight: 'bold', paddingLeft: 10 }}>Github Repo</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <ModalComponent />
        <TouchableHighlight
          style={styles.openButton}
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <Text style={styles.textStyle}>©2020 | Copyright Notice</Text>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 17,
    paddingVertical: 7,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: '100%',
  },
  centeredView: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#280393",
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    marginBottom: 60,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "left"
  },
  socialMedia: {
    paddingVertical: 5,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 10,
    margin: 3
  }
});