// Third-party WebUSB Arduino library
#include <WebUSB.h>

WebUSB WebUSBSerial(1 /* https:// */, "webusb.github.io/arduino/demos");

#define Serial WebUSBSerial

#define RED_LED_PIN 9
#define YELLOW_LED_PIN 10
#define GREEN_LED_PIN 11

#define COMMAND_PAYLOAD_SIZE 3

typedef struct
{
    char type;
    char payload[COMMAND_PAYLOAD_SIZE];
} Command;

int idx = 0;

void setup()
{
    Serial.begin(9600);

    while (!Serial)
    {
        ; // Wait for serial port to connect.
    }

    pinMode(RED_LED_PIN, OUTPUT);
}

void loop()
{
    if (Serial && Serial.available())
    {
        Command command = readCommand();

        switch (command.type)
        {
        case '1':
            analogWrite(RED_LED_PIN, atoi(command.payload));
            break;
        case '2':
            analogWrite(YELLOW_LED_PIN, atoi(command.payload));
            break;
        case '3':
            analogWrite(GREEN_LED_PIN, atoi(command.payload));
            break;
        default:
            Serial.write("Unknown command");
        }

        Serial.flush();
    }
}

Command readCommand()
{
    // Wait for command start flag
    while (Serial.read() != '\n')
    {
        ;
    }

    Command command;

    command.type = Serial.read();

    for (int i = 0; i < COMMAND_PAYLOAD_SIZE; i++)
    {
        command.payload[i] = Serial.read();
    }

    return command;
}