import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Switch } from 'react-native';

export default function VolleyballCourtHorizontal() {
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);
  const [selectedQuality, setSelectedQuality] = useState(null);
  const [selectedTarget, setSelectedTarget] = useState(null);
  const [isPoint, setIsPoint] = useState(false);
  const [notation, setNotation] = useState("");
  const [playerNumber, setPlayerNumber] = useState("");
  const [message, setMessage] = useState("Ola !");

  const actions = ["Attack", "Dig", "Freeball", "Receive", "Set", "Block", "Serve"];
  const qualities = [
    { value: "!", label: "Good" },
    { value: "+", label: "Normal" },
    { value: "-", label: "Poor" },
    { value: "*", label: "Error" }
  ];

  const actionCodes = {
    "Serve": "S",
    "Receive": "R",
    "Dig": "D",
    "Attack": "A",
    "Set": "ST",
    "FreeBall": "F",
    "Block": "B"
  };

  useEffect(() => {
    if (!playerNumber) {
      setNotation("");
      return;
    }

    let result = playerNumber;

    if (selectedAction) {
      result += actionCodes[selectedAction] ? ` ${actionCodes[selectedAction]}` : "";
      if (selectedQuality) {
        result += selectedQuality.value;
      }
      if (selectedTarget !== null) {
        result += `#${selectedTarget}`;
      }
      if (isPoint) {
        result += "=";
      }
    }

    setNotation(result);
  }, [playerNumber, selectedAction, selectedQuality, selectedTarget, isPoint]);

  const clearSelection = () => {
    setSelectedPosition(null);
    setSelectedAction(null);
    setSelectedQuality(null);
    setSelectedTarget(null);
    setIsPoint(false);
    setNotation("");
    setPlayerNumber("");
  };

  const onPositionPress = (pos) => {
    if (selectedAction === "Attack" || selectedAction === "Set") {
      setSelectedTarget(pos);
    } else {
      setSelectedPosition(pos);
      setPlayerNumber(pos.toString());
    }
  };

  return (
    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: "100%", height: "100%" }}>
      <View style={styles.messageContainer}>
        <Text style={styles.messageText}>{message}</Text>
      </View>
      <View style={styles.container}>
        {/* Court container */}
        <View style={styles.court}>
          {/* Positions arranged in two columns horizontally */}
          <View style={styles.column}>
            {[1, 3, 5].map(pos => (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: "center" }} key={pos}>
                <TouchableOpacity
                  key={pos}
                  style={[
                    styles.position,
                    selectedPosition === pos && styles.selectedPosition
                  ]}
                  onPress={() => onPositionPress(pos)}
                >
                  <Text style={styles.positionText}>{pos}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>

          <View style={styles.column}>
            {[2, 4, 6].map(pos => (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: "center" }} key={pos}>
                <TouchableOpacity
                  key={pos}
                  style={[
                    styles.position,
                    selectedPosition === pos && styles.selectedPosition
                  ]}
                  onPress={() => onPositionPress(pos)}
                >
                  <Text style={styles.positionText}>{pos}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>


          <View style={styles.column}>
            {[1, 2, 3].map(pos => (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: "center" }} key={pos}>
                <TouchableOpacity
                  key={pos}
                  style={[
                    styles.position,
                    selectedPosition === pos && styles.selectedPosition,
                    { backgroundColor: "#ff82f6" }
                  ]}
                >
                  <Text style={styles.positionText}>{pos}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
          <View style={styles.column}>
            {[4, 5, 6].map(pos => (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: "center" }} key={pos}>
                <TouchableOpacity
                  key={pos}
                  style={[
                    styles.position,
                    selectedPosition === pos && styles.selectedPosition,
                    { backgroundColor: "#ff82f6" }
                  ]}
                >
                  <Text style={styles.positionText}>{pos}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        <ScrollView style={styles.actionsContainer}>
          {actions.map(action => (
            <TouchableOpacity
              key={action}
              style={[
                styles.actionButton,
                selectedAction === action && styles.selectedAction
              ]}
              onPress={() => setSelectedAction(action)}
            >
              <Text>{action}</Text>
            </TouchableOpacity>
          ))}
          <View style={styles.qualityContainer}>
            <View style={styles.qualityButtons}>
              {qualities.map(quality => (
                <TouchableOpacity
                  key={quality.value}
                  style={[
                    styles.qualityButton,
                    selectedQuality?.value === quality.value && styles.qualityButtonSelected,
                  ]}
                  onPress={() => setSelectedQuality(quality)}
                >
                  <Text style={selectedQuality?.value === quality.value ? styles.qualityTextSelected : styles.qualityText}>
                    {quality.label} ({quality.value})
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={styles.pointContainer}>
            <Text style={styles.label}>Point:</Text>
            <Switch
              value={isPoint}
              onValueChange={setIsPoint}
            />
          </View>
          <View style={styles.notationContainer}>
            <Text style={styles.label}>Notation:</Text>
            <View style={styles.notationBox}>
              <Text style={styles.notationText}>{notation}</Text>
            </View>
          </View>
        </ScrollView>

        {/* Buttons */}
        {/* <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.btn, !notation && styles.btnDisabled]}
          disabled={!notation}
          onPress={addToTextarea}
        >
          <Text style={styles.btnText}>Add to Textarea</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, styles.btnClear]} onPress={clearSelection}>
          <Text style={styles.btnText}>Clear</Text>
        </TouchableOpacity>
      </View> */}
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: "100%",
    height: "auto",      // Layout horizontal
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
  },
  court: {
    flexDirection: 'row',
    backgroundColor: '#f97316', // orange background like your image
    borderWidth: 2,
    borderColor: '#000',
    padding: 8,
    borderRadius: 8,
    justifyContent: 'space-between',
    width: '65%',
  },
  column: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  position: {
    width: 100,
    height: 100,
    borderRadius: "50%",
    backgroundColor: '#3b82f6', // blue circle
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
  },
  selectedPosition: {
    backgroundColor: '#2563eb', // darker blue for selected
  },
  positionText: {
    color: 'white',
    fontWeight: 'bold',
  },
  actionsContainer: {
    backgroundColor: '#64748b', // blue-gray background for actions area
    padding: 8,
    borderRadius: 8,
    width: '30%',
  },
  actionsTitle: {
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
    color: 'white',
  },
  actionButton: {
    backgroundColor: 'white',
    padding: 8,
    marginBottom: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
  },
  selectedAction: {
    backgroundColor: '#93c5fd', // lighter blue for selected action
  },
  qualityButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  qualityButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 6,
    marginRight: 10,
    marginBottom: 10,
  },
  qualityButtonSelected: {
    backgroundColor: '#3b82f6',
  },
  qualityText: {
    color: 'black',
  },
  qualityTextSelected: {
    color: 'white',
  },
  pointContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  playerNumberContainer: {
    marginBottom: 20,
  },
  playerInput: {
    borderWidth: 1,
    borderColor: 'black',
    width: 60,
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 16,
    borderRadius: 4,
  },
  notationContainer: {
    marginBottom: 20,
  },
  notationBox: {
    backgroundColor: '#f3f4f6', // gray-100
    borderRadius: 4,
    padding: 10,
    minHeight: 40,
    justifyContent: 'center',
  },
  notationText: {
    fontFamily: 'monospace',
    fontSize: 18,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  btn: {
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    minWidth: 130,
    alignItems: 'center',
  },
  btnDisabled: {
    backgroundColor: '#93c5fd',
  },
  btnClear: {
    backgroundColor: '#dc2626',
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
  },
  messageContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#e5e7eb', // gray-200
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  messageText: {
    fontSize: 16,
    color: '#111827', // gray-900
  }
});
