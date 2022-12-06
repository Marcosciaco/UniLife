import React from "react";
import { View, Text, StyleSheet, ImageBackground,Pressable} from "react-native";
import { useState } from "react";
const imgProfile = { uri: "https://www.nelsalento.com/wp-content/uploads/2018/02/Grotta-Verde-di-Andrano1.jpg.webp" };


export function FollowButton(props:any) {

    const { onPress } = props;
    const [following, setFollowing] = useState<boolean>(true);
    const buttonText = following?"Unfollow":"Follow"

    const toggle = () => {
      onPress()
      setFollowing(!following)
    }
    //const [title1, setButtonText] = useState('Follow');
    //if(title1 == 'Follow')
    //    setButtonText('Unfollow')
    //else if (title1 == 'Unfollow')
    //    setButtonText('Follow')
    //else ;
    return (
      <Pressable style={styles.button} onPress={toggle}>
        <Text style={styles.text}>{buttonText}</Text>
      </Pressable>
    );
  }

export default function ProfileScreen({ navigation }: any) {
    return (
        <View style={styles.container}>

        {/* resizeMode (cover):
        
        contain : Scale the image uniformly (maintain the image's aspect ratio)
        so that both dimensions (width and height) of the image will be equal to
        or less than the corresponding dimension of the view (minus padding).
        stretch : Scale width and height independently,
        This may change the aspect ratio of the src. */}

        <ImageBackground style = {styles.logo} source={imgProfile} resizeMode="cover">
        <Text style={styles.title}>User1</Text>
        <Text style={styles.subtitle}>Bolzano Italy / Computer Science 3rd year </Text>
        <FollowButton onPress={() => null}/>
        </ImageBackground>
        </View>    
        );
    }
    
    export const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "#fff",
        },
        button: {
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 20,
            paddingHorizontal: 50,
            borderRadius: 4,
            elevation: 3,
            backgroundColor: 'grey',
            marginTop:65,
            marginLeft:10,
            marginRight:10,
            marginEnd:10,
          },
          text: {
            fontSize: 16,
            lineHeight: 21,
            fontWeight: 'bold',
            letterSpacing: 0.25,
            color:"lightblue",
          },
        title: {
            color:"lightblue",
            fontSize: 42,
            fontWeight: "bold",
            textAlign: "left",
            marginTop: 500,
            backgroundColor: "#000000c",
            font:"poppins"
        },
        subtitle: {
            color:"white",
            fontSize:21,
            fontWeight: "normal",
            textAlign: "left",
            marginTop: 5,
            backgroundColor: "#000000c",
            font:"poppins"
        },
        logo: {
            flex: 1,
            justifyContent: "center"
        },
    });