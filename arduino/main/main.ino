// Third-party WebUSB Arduino library
#include <WebUSB.h>

WebUSB WebUSBSerial(1 /* https:// */, "webusb.github.io/arduino/demos");

#define Serial WebUSBSerial

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
}

void loop()
{
    if (Serial && Serial.available())
    {
        Command command = readCommand();

        Serial.write(command.type);
        Serial.write(':');
        for (int i = 0; i < COMMAND_PAYLOAD_SIZE; i++)
        {
            Serial.write(command.payload[i]);
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