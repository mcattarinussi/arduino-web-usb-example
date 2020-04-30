#include <LiquidCrystal.h>
#include <WebUSB.h>

#define Serial WebUSBSerial

#define RED_LED_PIN 9
#define YELLOW_LED_PIN 10
#define GREEN_LED_PIN 11

#define COMMAND_PAYLOAD_SIZE 3
#define LCD_CONTRAST 50

typedef struct
{
    char type;
    char payload[COMMAND_PAYLOAD_SIZE];
} Command;

WebUSB WebUSBSerial(1 /* https:// */, "webusb.github.io/arduino/demos");
LiquidCrystal lcd(A5, A4, A3, A2, A1, A0);

int lcdLastCharPosition = -1;

void setup()
{
    pinMode(RED_LED_PIN, OUTPUT);

    setupLCD();
    setupSerial();
}

void loop()
{
    if (Serial && Serial.available())
    {
        Command command = readCommand();

        switch (command.type)
        {
        case '1':
        case '2':
        case '3':
            handleLedValue(command.type, atoi(command.payload));
            break;
        case '4':
            handleLCDChar(command.payload[0]);
            break;
        default:
            Serial.write("Unknown command");
        }

        Serial.flush();
    }
}

void setupSerial()
{
    Serial.begin(9600);
    while (!Serial)
    {
        ; // Wait for serial port to connect.
    }
}

void setupLCD()
{
    lcd.begin(16, 2);
    lcd.setCursor(0, 0);
    analogWrite(3, LCD_CONTRAST);
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

void handleLedValue(char commandType, int value)
{
    int pinNumber = commandType == '1' ? RED_LED_PIN : (commandType == '2' ? YELLOW_LED_PIN : GREEN_LED_PIN);
    analogWrite(pinNumber, value);
}

void handleLCDChar(char inputChar)
{
    if (inputChar == '\b')
    {
        if (lcdLastCharPosition == -1)
        {
            return;
        }

        lcd.setCursor(lcdLastCharPosition % 16, lcdLastCharPosition < 16 ? 0 : 1);
        lcd.print(" ");
        lcdLastCharPosition--;

        return;
    }

    if (lcdLastCharPosition == 31)
    {
        return;
    }

    lcdLastCharPosition++;

    lcd.setCursor(lcdLastCharPosition % 16, lcdLastCharPosition < 16 ? 0 : 1);
    lcd.print(inputChar);
}
