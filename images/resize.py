from PIL import Image
import os

# Set the path of the folder containing the images to be resized
folder_path = 'work/'

# Set the size of the output image
output_size = (100, 100)

if not os.path.exists(folder_path+"resize/"):
    os.makedirs(folder_path+"resize/")

# Set the width of the output image
output_width = 100

# Loop through all files in the folder
for filename in os.listdir(folder_path):
    # Check if the file is an image
    if filename.endswith('.jpg') or filename.endswith('.jpeg') or filename.endswith('.png') or filename.endswith('.gif'):
        # Open the image file
        image = Image.open(os.path.join(folder_path, filename)).convert('RGBA')

        # Remove any white background
        alpha = image.convert('RGBA').split()[-1]
        bg = Image.new('RGBA', image.size, (255, 255, 255, 0))
        bg.paste(image, mask=alpha)
        image = bg

        # Resize the image to have a width of 100px while maintaining the aspect ratio
        width, height = image.size
        aspect_ratio = height / width
        new_size = (output_width, int(output_width * aspect_ratio))
        new_image = image.resize(new_size, resample=Image.LANCZOS)

        # Add padding to the top and bottom of the resized image
        padding = (0, (output_width - new_size[1]) // 2)
        padded_image = Image.new('RGBA', (output_width, output_width), (255, 255, 255, 0))
        padded_image.paste(new_image, padding)

        # Save the resized image with transparent background
        new_filename = os.path.splitext(filename)[0] + '.png'
        new_image.save(os.path.join(folder_path+"resize/", new_filename))
