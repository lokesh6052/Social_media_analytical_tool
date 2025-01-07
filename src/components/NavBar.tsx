"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";

function NavBar({ className }: { className?: string }) {
	const [active, setActive] = useState<string | null>(null);
	return (
		<div
			className={cn(
				"fixed top-5 inset-x-0 max-w-3xl mx-auto z-50 bg-transparent",
				className
			)}>
			<Menu setActive={setActive}>
				<Link href='/'>
					<MenuItem
						setActive={setActive}
						active={active}
						item='Mock'></MenuItem>
				</Link>

				<Link href='/contact'>
					<MenuItem
						setActive={setActive}
						active={active}
						item='Contact-Us'></MenuItem>
				</Link>

				<MenuItem setActive={setActive} active={active} item='Services'>
					<div className='flex flex-col gap-y-4 text-sm drop-shadow-lg'>
						<HoveredLink href='/WebServices'>Web Development</HoveredLink>
						<HoveredLink href='/SocialMediaMarketing'>
							Social Media Marketing
						</HoveredLink>
						<HoveredLink href='/VideoEditing'>Video Editing</HoveredLink>
						<HoveredLink href='/GoogleAds'>Google Ads</HoveredLink>
						<HoveredLink href='/WebSiteHosting'>WebSite Hosting</HoveredLink>
					</div>
				</MenuItem>

				<MenuItem setActive={setActive} active={active} item='Products'>
					<div className='  text-sm grid grid-cols-2 gap-10 p-4'>
						<ProductItem
							title='Canva'
							href='https://algochurn.com'
							src='/products/realcanva.jpg'
							description="Prepare your B_Rolls and PNG's simplier."
						/>
						<ProductItem
							title='Premiere Pro'
							href='https://algochurn.com'
							src='/products/premiere pro.jpg'
							description='Professional video editing Software.'
						/>
						<ProductItem
							title='Affter Effects'
							href='https://algochurn.com'
							src='/products/affterEffects.jpg'
							description='Professional animation editing Software.'
						/>
					</div>
				</MenuItem>

				<MenuItem setActive={setActive} active={active} item='Courses'>
					<div className='flex flex-col gap-y-4 text-sm'>
						<HoveredLink href='/AllCourses'>All Courses</HoveredLink>
						<HoveredLink href='/AllCourses'>Video Editing</HoveredLink>
						<HoveredLink href='/AllCourses'>WordPress</HoveredLink>
						<HoveredLink href='/AllCourses'>Google Ads</HoveredLink>
						<HoveredLink href='/AllCourses'>digital Marketing</HoveredLink>
					</div>
				</MenuItem>
			</Menu>
		</div>
	);
}

export default NavBar;
