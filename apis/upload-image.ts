export const uploadImage = async (file: File): Promise<Image> => {
    // const formData = new FormData();
    // formData.append('file', file);
    // const response = await fetch('http://localhost:3000/upload-image', {
    //     method: 'POST',
    //     body: formData
    // });
    // const data = await response.json();
    // return data.url;
    return {
        url: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_92x30dp.png',
        name: file.name
    };
}

export interface Image {
    url: string;
    name: string;
}