import telebot
import instaloader
import os
import datetime
import re
import math
from keep_alive import keep_alive
import pytz
keep_alive()
# Initialize Telegram Bot
bot = telebot.TeleBot('7190804820:AAHVktPU9LpTf8JHygr1HK7kEJzL-npC7k8')

# Initialize Instaloader
L = instaloader.Instaloader()

# Define file paths
link_file = 'link/link.txt'
image_dir = 'images'
current_page = 0
# Define a function to handle error
DB_FILE_PATH = 'DB/db.txt'

# Define a function to handle the /start command
def get_greeting():
    # Get the current UTC time
    utc_now = datetime.datetime.utcnow()

    # Convert UTC time to Indian Standard Time
    ist = pytz.timezone('Asia/Kolkata')
    ist_now = utc_now.astimezone(ist).time()

    if ist_now < datetime.time(12):
        return "🙏ನಮಸ್ಕಾರ ಬೆಳಗಿನ ವಂದನೆಗಳು! Good Morning!"
    elif ist_now < datetime.time(18):
        return "🙏ನಮಸ್ಕಾರ ಮಧ್ಯಾನದ ವಂದನೆಗಳು! Good Afternoon!"
    else:
        return "🙏ನಮಸ್ಕಾರ ಸಂಜೆಯ ವಂದನೆಗಳು! Good Evening!"
@bot.message_handler(commands=['start'])
def start(message):
    # Define the keyboard layout
    chat_id = message.chat.id
    photo_path = "KGM.jpg"
    user_name = message.from_user.username
    greeting_message = get_greeting()
    keyboard = telebot.types.InlineKeyboardMarkup()
    keyboard.row(
        telebot.types.InlineKeyboardButton("\U0001F5BC Instagram", url="https://www.instagram.com/kannadagamershub"),
        telebot.types.InlineKeyboardButton("🌐 Website", url="https://kannadagamershub.000webhostapp.com")
    )
    keyboard.row(
        telebot.types.InlineKeyboardButton("\U0001F3A5 YouTube Channel", url="https://www.youtube.com/@KannadaGamershub"),
        telebot.types.InlineKeyboardButton("\U0001F4F1 WhatsApp Channel", url="https://whatsapp.com/channel/0029VaU05uG9RZAeiXKyEu06")
    )
    bot.send_photo(chat_id=chat_id, photo=open(photo_path, 'rb'))
    bot.send_message(chat_id=chat_id, text=f"{greeting_message}, @{user_name}. Welcome to Mod Sender Bot!:", reply_markup=keyboard)
    user = message.from_user
    user_id = user.id
    first_name = user.first_name
    last_name = user.last_name
    username = user.username
    ist = pytz.timezone('Asia/Kolkata')
    ist_now = datetime.datetime.now(tz=ist)

# Format the timestamp in IST
    current_time = ist_now.strftime('%Y-%m-%d %H:%M:%S')
    details_str = f"/Start : Date/Time: {current_time}\nUser ID: {user_id}\nFirst Name: {first_name}\nLast Name: {last_name}\nUsername: {username}\nChat_id:{chat_id}\n"

    # Append user details to the db.txt file
    with open(DB_FILE_PATH, 'a') as file:
        file.write(details_str + '\n')

# Define a function to handle the /mods command
def read_mod_data():
    mod_data = []
    with open(link_file, 'r') as file:
        for line in file:
            line = line.strip()
            if line:
                mod_name, mod_link, mod_image = re.split(r'\s+', line, maxsplit=2)
                mod_data.append({'name': mod_name, 'link': mod_link, 'image': mod_image})
    return mod_data

@bot.message_handler(commands=['mods'])
def mods(message):
    # Get the mod data
    mod_data = read_mod_data()

    # Calculate the total number of pages based on the number of mods (assuming 10 mods per page)
    total_pages = math.ceil(len(mod_data) / 10)

    # Calculate the starting and ending index for the current page
    start_index = current_page * 10
    end_index = min((current_page + 1) * 10, len(mod_data))

    # Create keyboard layout for the current page
    keyboard = telebot.types.InlineKeyboardMarkup()
    for mod in mod_data[start_index:end_index]:
        keyboard.add(telebot.types.InlineKeyboardButton(mod['name'], callback_data=mod['name']))

    # Add pagination buttons
    if current_page > 0:
        keyboard.row(telebot.types.InlineKeyboardButton(f"← Previous ({current_page})", callback_data="prev"))
    if current_page < total_pages - 1:
        keyboard.row(telebot.types.InlineKeyboardButton(f"Next ({current_page + 2} →)", callback_data="next"))

    # Send message with inline keyboard markup
    bot.send_message(chat_id=message.chat.id, text='Choose a mod:', reply_markup=keyboard)

# Define a function to handle button clicks for pagination
@bot.callback_query_handler(func=lambda call: call.data in ['prev', 'next'])
def pagination_button_click(call):
    global current_page

    # Update current page based on button clicked
    if call.data == 'prev':
        current_page -= 1
    elif call.data == 'next':
        current_page += 1

    # Re-send the mods list with the updated page
    mods(call.message)

# Define a function to handle button clicks for mod selection
@bot.callback_query_handler(func=lambda call: call.data not in ['prev', 'next'])
def button_click(call):
    mod_data = read_mod_data()

    for mod in mod_data:
        if mod['name'] == call.data:
            mod_link = mod['link']
            mod_image = mod['image']
            image_path = os.path.join(image_dir, mod_image)

            # Send photo with caption containing the download link
            bot.send_photo(call.message.chat.id, open(image_path, 'rb'), caption=f"Download {call.data} from: {mod_link}")
            bot.send_message(call.message.chat.id, "Download Link sent successfully. 💛❤️")

            break
@bot.message_handler(commands=['id'])
def get_user_details(message):
    user = message.from_user
    user_id = user.id
    first_name = user.first_name
    last_name = user.last_name
    username = user.username
    ist = pytz.timezone('Asia/Kolkata')
    ist_now = datetime.datetime.now(tz=ist)

# Format the timestamp in IST
    current_time = ist_now.strftime('%Y-%m-%d %H:%M:%S')
    chat_id = message.chat.id

    details_str = f"/ID : Date/Time: {current_time}\nUser ID: {user_id}\nFirst Name: {first_name}\nLast Name: {last_name}\nUsername: {username}\nChat_id:{chat_id}\n"

    # Append user details to the db.txt file
    with open(DB_FILE_PATH, 'a') as file:
        file.write(details_str + '\n')

    bot.send_message(chat_id=message.chat.id, text=f"/ID : Date/Time:{current_time}.\n User ID: {user_id}.\n First name: {first_name}.\n last name: {last_name}.\n Username: {username}\n Chat_id: {chat_id}")

# Define a function to handle the /aboutus command
@bot.message_handler(commands=['aboutus'])
def about_us(message):
    # Details about the owners
    owner1_details = """
    Developer & CoOwner & CoFounder :
    Name: *MithunGowda.B*
    Email: mithungowda.b7411@gmail.com
    Instagram: http://instagram.com/mithun.gowda.b
    #######################################
    Owner & Founder & Content :
    Name: *Manvanth* (Appu)
    Email: kannadagamershub@gmail.com
    Instagram: https://www.instagram.com/________star_shadow________
    #######################################
    CoOwner & Investor :
    Name: *Nithin* (Niki)
    Instagram: https://www.instagram.com/_mr_dynamic__
    """
    # Send the owner details to the user
    bot.send_message(chat_id=message.chat.id, text=owner1_details)

# Define a function to handle the /list command
@bot.message_handler(commands=['list'])
def availablemodslist(message):
    mod_data = read_mod_data()
    mods_list = "\n".join([f"{mod['name']}" for mod in mod_data])

    # Send the file content as a message
    bot.send_message(chat_id=message.chat.id, text=f"Sending Available Mods List: \n\n{mods_list}")

# Define a function to handle the /commands command
@bot.message_handler(commands=['commands'])
def button(message):
    bot.send_message(chat_id=message.chat.id, text="/start to start the bot. /mods to get the Mods from the bot.")

# Define a function to handle unknown commands
@bot.message_handler(commands=['apptourni'])
def tourniment(message):
    bot.send_message(chat_id=message.chat.id, text="We will update you soon....") 
@bot.message_handler(func=lambda message: True)
def unknown(message):
    bot.send_message(chat_id=message.chat.id, text="Sorry, I didn't understand that command.")

while True:
    try:
        bot.polling()
    except Exception as e:
        print(f"An error occurred: {e}")
        # Wait for a short period before retrying
        time.sleep(5)  # Wait for 5 seconds before retrying
