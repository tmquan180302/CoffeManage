import React, { useRef } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Swiper from 'react-native-swiper';

const Home = () => {
  const swiperRef = useRef(null);

  const handleAutoPlay = () => {
    if (swiperRef && swiperRef.current) {
      swiperRef.current.scrollBy(1, true);
    }
  };

  return (
    <Swiper
      ref={swiperRef}
      style={styles.wrapper}
      autoplay={true}
      autoplayTimeout={3} // Specify the timeout in seconds
      onIndexChanged={handleAutoPlay} // This callback will be called when the slide changes
    >
      <View style={styles.slide}>
        <Image source={require('../../assets/cp1.jpg')}></Image>
      </View>
      <View style={styles.slide}>
        <Image source={require('../../assets/cp2.jpg')}></Image>

      </View>
      <View style={styles.slide}>
        <Image source={require('../../assets/cp3.jpg')}></Image>

      </View>
    </Swiper>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eaeaea',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Home;
