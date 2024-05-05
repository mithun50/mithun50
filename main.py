# Update this import statement to import Chat from the telegram package
from telegram import InlineKeyboardButton, InlineKeyboardMarkup, Chat, Bot
#import loggin
from telegram.error import NetworkError
# Your existing import statements
from telegram.ext import Updater, CommandHandler, MessageHandler, InlineQueryHandler, ConversationHandler, CallbackContext, CallbackQueryHandler
from telegram.error import NetworkError
import os
import datetime
import time
#import logging
import math
import re
from queue import Queue
from keep_alive import keep_alive
#logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', level=logging.INFO)
keep_alive()
# Define your Telegram bot token
TOKEN = "7190804820:AAHVktPU9LpTf8JHygr1HK7kEJzL-npC7k8"

# Define the directory where the files are stored
#path Defined is termux path
FILENAME = 0
bot = Bot(token=TOKEN)
update_queue = Queue()
DB_FILE_PATH = 'db.txt'
link_file = 'link.txt'
image_dir = ''
current_page = 0
# Define a function to handle error


# Define a function to handle the /start command
def get_greeting():
    current_time = datetime.datetime.now().time()
    if current_time < datetime.time(12):
        return "🙏ನಮಸ್ಕಾರ ಬೆಳಗಿನ ವಂದನೆಗಳು! Good Morning!"
    elif current_time < datetime.time(18):
        return "🙏ನಮಸ್ಕಾರ ಮಧ್ಯಾನದ ವಂದನೆಗಳು! Good Afternoon!"
    else:
        return "🙏ನಮಸ್ಕಾರ ಸಂಜೆಯ ವಂದನೆಗಳು! Good Evening!"
def start(update, context):
    # Define the keyboard layout
    chat_id = update.message.chat_id
    photo_path = "/data/data/com.termux/files/home/KGMy033/KGM.jpg"
    user_name = update.message.from_user.username
    greeting_message = get_greeting()
    keyboard = [
        [InlineKeyboardButton("\U0001F5BC Instagram", url="https://www.instagram.com/kannadagamershub")],
        [InlineKeyboardButton("🌐 Website", url="https://kannadagamershub.000webhostapp.com")],
        [InlineKeyboardButton("\U0001F3A5 YouTube Channel", url="https://www.youtube.com/@KannadaGamershub")],
        [InlineKeyboardButton("\U0001F4F1 WhatsApp Channel", url="https://whatsapp.com/channel/0029VaU05uG9RZAeiXKyEu06")],
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    context.bot.send_photo(chat_id=chat_id, photo=open(photo_path, 'rb'))
    context.bot.send_message(chat_id=update.message.chat_id, text=f"{greeting_message}, @{user_name}. Welcome to Mod Sender Bot!:", reply_markup=reply_markup)
    user = update.message.from_user
    user_id = user.id
    first_name = user.first_name
    last_name = user.last_name
    username = user.username
    current_time = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    chat_id = update.message.chat_id

    details_str = f"/Start : Date/Time: {current_time}\nUser ID: {user_id}\nFirst Name: {first_name}\nLast Name: {last_name}\nUsername: {username}\nChat_id:{chat_id}\n"

    # Append user details to the db.txt file
    with open(DB_FILE_PATH, 'a') as file:
        file.write(details_str + '\n')

# Define a function to handle the /sendfile command

def read_mod_data():
    mod_data = []
    with open(link_file, 'r') as file:
        for line in file:
            line = line.strip()
            if line:
                mod_name, mod_link, mod_image = re.split(r'\s+', line, maxsplit=2)
                mod_data.append({'name': mod_name, 'link': mod_link, 'image': mod_image})
    return mod_data

# Define a function to start the bot
# Define a global variable to keep track of the current page


# Define a function to handle the /mods command
def mods(update, context):
    # Get the mod data
    mod_data = read_mod_data()

    # Calculate the total number of pages based on the number of mods (assuming 10 mods per page)
    total_pages = math.ceil(len(mod_data) / 10)

    # Calculate the starting and ending index for the current page
    start_index = current_page * 10
    end_index = min((current_page + 1) * 10, len(mod_data))

    # Create keyboard layout for the current page
    keyboard = []
    for mod in mod_data[start_index:end_index]:
        keyboard.append([InlineKeyboardButton(mod['name'], callback_data=mod['name'])])

    # Add pagination buttons
    pagination_keyboard = []

    # Add "Previous" button with the previous page number
    if current_page > 0:
        prev_page_num = current_page
        pagination_keyboard.append(InlineKeyboardButton(f"← Previous ({prev_page_num})", callback_data="prev"))

    # Add "Next" button with the next page number
    if current_page < total_pages - 1:
        next_page_num = current_page + 2
        pagination_keyboard.append(InlineKeyboardButton(f"Next ({next_page_num} →)", callback_data="next"))

    # Add pagination buttons to the keyboard layout
    keyboard.append(pagination_keyboard)

    # Send message with inline keyboard markup
    reply_markup = InlineKeyboardMarkup(keyboard)
    update.message.reply_text('Choose a mod:', reply_markup=reply_markup)

# Define a function to handle button clicks for pagination
def pagination_button_click(update, context):
    global current_page

    # Get the callback query
    query = update.callback_query
    query.answer()

    # Get the callback data
    callback_data = query.data

    # Update current page based on button clicked
    if callback_data == 'prev':
        current_page -= 1
    elif callback_data == 'next':
        current_page += 1

    # Re-send the mods list with the updated page
    mods(update, context)

# Add the command handlers to the dispatcher

# Function to handle button clicks
def button_click(update, context):
    mod_data = read_mod_data()
    query = update.callback_query
    mod_name = query.data

    for mod in mod_data:
        if mod['name'] == mod_name:
            mod_link = mod['link']
            mod_image = mod['image']
            image_path = os.path.join(image_dir, mod_image)

            # Send photo with caption containing the download link
            query.answer()
            query.message.reply_photo(open(image_path, 'rb'), caption=f"Download {mod_name} from: {mod_link}")
            query.message.reply_text("Download Link sent successfully. 💛❤️")

            break

def get_user_details(update: Updater, context: CallbackContext):
    user = update.message.from_user
    user_id = user.id
    first_name = user.first_name
    last_name = user.last_name
    username = user.username
    current_time = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    chat_id = update.message.chat_id

    details_str = f"/ID : Date/Time: {current_time}\nUser ID: {user_id}\nFirst Name: {first_name}\nLast Name: {last_name}\nUsername: {username}\nChat_id:{chat_id}\n"

    # Append user details to the db.txt file
    with open(DB_FILE_PATH, 'a') as file:
        file.write(details_str + '\n')

    update.message.reply_text(f"/ID : Date/Time:{current_time}.\n User ID: {user_id}.\n First name: {first_name}.\n last name: {last_name}.\n Username: {username}\n Chat_id: {chat_id}")
    print(user_id)
    print(first_name)
    print(last_name)
    print(username)

    # Print or use user details as needed
def about_us(update, context):
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
    context.bot.send_message(chat_id=update.message.chat_id, text=owner1_details)
def availablemodslist(update, context):
    mod_data = read_mod_data()
    mods_list = "\n".join([f"{mod['name']}" for mod in mod_data])

# Send the file content as a message
    bot.send_message(chat_id=update.message.chat_id, text=f"Sending Available Mods List: \n\n{mods_list}")
    
def button(update, context):
    context.bot.send_message(chat_id=update.message.chat_id, text="/start for start the bot. /mods for taking the Mods from the bot.")
def unknown(update, context):
    context.bot.send_message(chat_id=update.message.chat_id, text="Sorry, I didn't understand that command.")
    return FILENAME
def tourniment(update, context):
    context.bot.send_message(chat_id=update.message.chat_id, text="We Will Update soon....")
# Create the Updater and pass your bot's token
updater = Updater(bot=bot, update_queue=update_queue)

# Get the dispatcher to register handlers
dispatcher = updater.dispatcher

# Add a command handler for the /start command
dispatcher.add_handler(CommandHandler("start", start))
dispatcher.add_handler(CommandHandler("mods", mods))
dispatcher.add_handler(CallbackQueryHandler(pagination_button_click, pattern='^(prev|next)$'))
dispatcher.add_handler(CallbackQueryHandler(button_click))
dispatcher.add_handler(CommandHandler("aboutus", about_us))
dispatcher.add_handler(CommandHandler("id", get_user_details))
dispatcher.add_handler(CommandHandler("Commands", button))
dispatcher.add_handler(CommandHandler("apptourni", tourniment))
# Add a message handler for unknown commands
dispatcher.add_handler(CommandHandler("list", availablemodslist))

dispatcher.add_handler(MessageHandler(Filters.command, unknown))
# Start the Bot
updater.start_polling()

# Run the bot until you press Ctrl-C
updater.idle()
