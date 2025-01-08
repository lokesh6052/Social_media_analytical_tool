import React from "react";

const Footer = () => {
	return (
		<div>
			<div className='relative flex justify-center items-center w-full mt-20'>
				<div className='absolute inset-0 w-full h-32 bg-gradient-to-r from-pink-600 to-blue-600 blur-xl'></div>
				<p className='mt-16 z-10 text-4xl font-bold'>
					Created by Team DevEpic 👨‍💻
				</p>
			</div>
		</div>
	);
};

export default Footer;
