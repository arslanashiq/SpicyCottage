import React, {useState, useEffect} from 'react';
import {View, Text, Button} from 'react-native';


const StoreTest = props => {
  const Number = useSelector(state => state.num);
  const dispatch = useDispatch();

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Button
        style={{paddingHorizontal: 100}}
        title="Rem"
        onPress={() => dispatch(decrement(Number))}
      />

      <Text style={{paddingHorizontal: 20,color:"black",fontSize:15,fontWeight:"600"}}>{Number}</Text>

      <Button
        style={{paddingHorizontal: 20}}
        title="Add"
        onPress={() => dispatch(increment(Number))}
      />
    </View>
  );
};

export default StoreTest;
