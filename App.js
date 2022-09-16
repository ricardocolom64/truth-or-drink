import * as React from 'react';
import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider, VStack, Text, Box, HStack, Button, Spacer, Center, ArrowForwardIcon, ArrowBackIcon, Divider, useToast, IconButton, InfoIcon, InfoOutlineIcon } from 'native-base';
import { StyleSheet, View, Image } from 'react-native';

import NativeConstants from 'expo-constants';

import instructionsCard from "./assets/images/instructions-small.png"

import onTheRocksCards from './OnTheRocksCards';
import extraDirtyCards from './ExtraDirtyCards';
import happyHourCards from './HappyHourCards';
import lastCallCards from './LastCallCards';

/* ----- TO DO -----

TO DO -- Tap Screen to flip card? idk

---------------------- */

export default function App() {

  const [category, setCategory] = useState(0);

  const [onTheRocks, setOnTheRocks] = useState([]);
  const [onTheRocksIndex, setOnTheRocksIndex] = useState(0);

  const [extraDirty, setExtraDirty] = useState([]);
  const [extraDirtyIndex, setExtraDirtyIndex] = useState(0);

  const [happyHour, setHappyHour] = useState([]);
  const [happyHourIndex, setHappyHourIndex] = useState(0);

  const [lastCall, setLastCall] = useState([]);
  const [lastCallIndex, setLastCallIndex] = useState(0);

  const infoButton = () => {
    if(category == 0)
      return <IconButton position={"absolute"} right={0} size="md" icon={<InfoIcon />} borderRadius="full" _icon={{ color: 'black' }} _pressed={{bg: "black:alpha.20"}}/>
    else
      return <IconButton position={"absolute"} right={0} size="md" icon={<InfoOutlineIcon />} borderRadius="full" _icon={{ color: 'black' }} _pressed={{bg: "black:alpha.20"}} onPress={() => { setCategory(0)}} />
  }

  const onTheRocksButton = () => {
    return <Button size="xs" p="2" w={128} colorScheme="white" bg={(category == 1) ? "indigo.700" : "white"} variant={(category == 1) ? "outline" : "solid"} borderWidth={1} borderColor="indigo.700" shadow={4} onPress={() => { setCategory(1) }}>
      <Text fontWeight={"extrabold"} color={(category == 1) ? "white" : "indigo.700"}>ON THE ROCKS</Text>
    </Button>
  }

  const extraDirtyButton = () => {
    return <Button size="xs" p="2" w={128} colorScheme="white" bg={(category == 2) ? "red.600" : "white"} variant={(category == 2) ? "outline" : "solid"} borderWidth={1} borderColor="red.600" shadow={4} onPress={() => { setCategory(2) }}>
      <Text fontWeight={"extrabold"} color={(category == 2) ? "white" : "red.600"}>EXTRA DIRTY</Text>
    </Button>
  }

  const happyHourButton = () => {
    return <Button size="xs" p="2" w={128} colorScheme="white" bg={(category == 3) ? "yellow.400" : "white"} variant={(category == 3) ? "outline" : "solid"} borderWidth={1} borderColor="yellow.400" shadow={4} onPress={() => { setCategory(3) }}>
      <Text fontWeight={"extrabold"} color={(category == 3) ? "teal.500" : "yellow.400"}>HAPPY HOUR</Text>
    </Button>
  }

  const lastCallButton = () => {
    return <Button size="xs" p="2" w={128} colorScheme="white" bg={(category == 4) ? "#18123A" : "white"} variant={(category == 4) ? "outline" : "solid"} borderWidth={1} borderColor="#18123A" shadow={4} onPress={() => { setCategory(4) }}>
      <Text fontWeight={"extrabold"} color={(category == 4) ? "secondary.400" : "#18123A"}>LAST CALL</Text>
    </Button>
  }

  const handleShuffle = () => {
    console.log("Shuffling...");

    // Durstenfeld Shuffle is pretty cool

    var arrCopy = [];

    if (category == 1)
      arrCopy = onTheRocks;
    else if (category == 2)
      arrCopy = extraDirty;
    else if (category == 3)
      arrCopy = happyHour;
    else if (category == 4)
      arrCopy = lastCall;

    for (var i = arrCopy.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = arrCopy[i];
      arrCopy[i] = arrCopy[j];
      arrCopy[j] = temp;
    }

    if (category == 1) {
      setOnTheRocks([]);
      setOnTheRocks((arr) => [...arr, ...arrCopy]);

      setOnTheRocksIndex(0);
    }
    else if (category == 2) {
      setExtraDirty([]);
      setExtraDirty((arr) => [...arr, ...arrCopy]);
    }
    else if (category == 3) {
      setHappyHour([]);
      setHappyHour((arr) => [...arr, ...arrCopy]);
    }
    else if (category == 4) {
      setLastCall([]);
      setLastCall((arr) => [...arr, ...arrCopy]);
    }

  }

  const handleCurrentCard = () => {
    if (category == 0)
      return <Image style={styles.gameCard} source={instructionsCard} resizeMode="contain" borderRadius={8} />

    if (category == 1)
      return <Image style={styles.gameCard} source={onTheRocks[onTheRocksIndex]} resizeMode="contain" borderRadius={8} />

    else if (category == 2)
      return <Image style={styles.gameCard} source={extraDirty[extraDirtyIndex]} resizeMode="contain" borderRadius={8} />

    else if (category == 3)
      return <Image style={styles.gameCard} source={happyHour[happyHourIndex]} resizeMode="contain" borderRadius={8} />

    else if (category == 4)
      return <Image style={styles.gameCard} source={lastCall[lastCallIndex]} resizeMode="contain" borderRadius={8} />
  }

  const handleNextCard = () => {
    if (category == 1) {
      if (onTheRocksIndex == onTheRocks.length - 1)
        setOnTheRocksIndex(0);
      else
        setOnTheRocksIndex(onTheRocksIndex + 1);

      //console.log("Next -> " + onTheRocksIndex);
    }
    else if (category == 2) {
      if (extraDirtyIndex == extraDirty.length - 1)
        setExtraDirtyIndex(0);
      else
        setExtraDirtyIndex(extraDirtyIndex + 1);

      //console.log("Next -> " + extraDirtyIndex);
    }
    else if (category == 3) {
      if (happyHourIndex == happyHour.length - 1)
        setHappyHourIndex(0);
      else
        setHappyHourIndex(happyHourIndex + 1);

      //console.log("Next -> " + happyHourIndex);
    }
    else if (category == 4) {
      if (lastCallIndex == lastCall.length - 1)
        setLastCallIndex(0);
      else
        setLastCallIndex(lastCallIndex + 1);

      //console.log("Next -> " + lastCallIndex);
    }
  }

  const handlePrevCard = () => {
    if (category == 0) {
      if (onTheRocksIndex == 0)
        setOnTheRocksIndex(onTheRocks.length - 1);
      else
        setOnTheRocksIndex(onTheRocksIndex - 1);

      //console.log("Prev -> " + onTheRocksIndex);
    }
    else if (category == 1) {
      if (extraDirtyIndex == 0)
        setExtraDirtyIndex(extraDirty.length - 1);
      else
        setExtraDirtyIndex(extraDirtyIndex - 1);

      //console.log("Prev -> " + extraDirtyIndex);
    }
    else if (category == 2) {
      if (happyHourIndex == 0)
        setHappyHourIndex(happyHour.length - 1);
      else
        setHappyHourIndex(happyHourIndex - 1);

      //console.log("Prev -> " + happyHourIndex);
    }
    else {
      if (lastCallIndex == 0)
        setLastCallIndex(lastCall.length - 1);
      else
        setLastCallIndex(lastCallIndex - 1);

      //console.log("Next -> " + lastCallIndex);
    }
  }

  useEffect(() => {
    setOnTheRocks([]);
    setOnTheRocks((arr) => [...arr, ...onTheRocksCards]);

    setExtraDirty([]);
    setExtraDirty((arr) => [...arr, ...extraDirtyCards]);

    setHappyHour([]);
    setHappyHour((arr) => [...arr, ...happyHourCards]);

    setLastCall([]);
    setLastCall((arr) => [...arr, ...lastCallCards]);
  }, [])

  useEffect(() => {
    handleCurrentCard();
  }, [category])

  return (
    <NativeBaseProvider>
      <View style={styles.statusBar}>
        <StatusBar style='auto' />
      </View>
      <View style={styles.container}>
        <Spacer />
        <Center>
          <HStack w="90%">
            <Box w="100%" alignItems={"center"}>
              <HStack w="130" bg="white" shadow={4} borderWidth={2} justifyContent={"space-between"} p="1">
                <Box>
                  <Text fontWeight={"extrabold"}>TRUTH</Text>
                </Box>
                <Center>
                  <Box>
                    <Text fontWeight={"extrabold"} fontSize="8">OR</Text>
                  </Box>
                </Center>
                <Box>
                  <Text fontWeight={"extrabold"}>DRINK</Text>
                </Box>
              </HStack>
            </Box>
            <Center>
              {infoButton()}
            </Center>
          </HStack>
        </Center>
        <VStack m="3" w="90%" h="80%">
          <Spacer />
          <Center>
            <Box w={274}>
              <VStack >
                <HStack mb="2" w="100%">
                  {onTheRocksButton()}
                  <Spacer />
                  {extraDirtyButton()}
                </HStack>
                <HStack mt="2" w="100%">
                  {happyHourButton()}
                  <Spacer />
                  {lastCallButton()}
                </HStack>
              </VStack>
            </Box>
          </Center>
          <Spacer />
          <Center>
            <Box bg="white" rounded="8" shadow={4} borderWidth="1" borderColor="coolGray.400" w="344">
              <Center>
                {handleCurrentCard()}
              </Center>
            </Box>
          </Center>
          <Spacer />
          <Center>
            <HStack w="342" mb="-3">
              <Button size="xs" p="2" colorScheme="blueGray" shadow={4} onPress={() => {
                handlePrevCard();
              }}>
                <HStack>
                  <Center>
                    <ArrowBackIcon color="white" />
                  </Center>
                  <Text fontWeight={"extrabold"} color="white">  PREV</Text>
                </HStack>
              </Button>
              <Spacer />
              <Button size="xs" p="2" px="8" colorScheme="green" shadow={4} onPress={() => {
                handleShuffle(); toast.show({ description: "asdsd", placement: "bottom" })
              }}>
                <Text fontWeight={"extrabold"} color="white">SHUFFLE</Text>
              </Button>
              <Spacer />
              <Button size="xs" p="2" colorScheme="blueGray" shadow={4} onPress={() => {
                handleNextCard();
              }}>
                <HStack>
                  <Text fontWeight={"extrabold"} color="white">NEXT  </Text>
                  <Center>
                    <ArrowForwardIcon color="white" />
                  </Center>
                </HStack>
              </Button>
            </HStack>
          </Center>
          <Spacer />
        </VStack>
        <Divider w="90%" />
        <Spacer />
        <Center>
          <Text color="coolGray.400">
            App by Rick tell him thanks :)
          </Text>
        </Center>
        <Spacer />
        <Center>
          <Text color="coolGray.400">
            v0.1
          </Text>
        </Center>
        <Spacer />
      </View>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 4,
  },
  statusBar: {
    height: NativeConstants.statusBarHeight,
  },
  gameCard: {
    width: 342,
    height: 488,
  },
  invis: {
    display: "hidden",
  }
});
