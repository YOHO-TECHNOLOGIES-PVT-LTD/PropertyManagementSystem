import { useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { MdOutlineSecurity } from 'react-icons/md';
import AccountSettings from '../../components/settings/AccountSettings';
import SecuritySettings from '../../components/settings/SecuritySettings';

export default function Settings() {
	const [activeTab, setActiveTab] = useState('account');

	const tabButtonClasses = (tab: any) =>
		`flex items-center gap-2 px-3 py-1.5 rounded-md border 
    ${
			activeTab === tab
				? 'bg-[#B200FF] text-white font-semibold border-[#B200FF]'
				: 'border-[#7D7D7D] text-[#7D7D7D]'
		}`;

	return (
		<div className='p-6'>
			{/* Page Header */}
			<h1 className='font-bold text-[24px]'>Settings</h1>
			<p className='text-[#7D7D7D] mb-6'>
				Manage Your Account Settings and Preferences
			</p>

			<div className='flex gap-6'>
				{/* Sidebar */}
				<div className='flex flex-col w-45 gap-3  bg-white rounded-lg shadow p-3'>
					<button
						onClick={() => setActiveTab('account')}
						className={tabButtonClasses('account')}
					>
						<CgProfile size={20} /> Account
					</button>
					<button
						onClick={() => setActiveTab('security')}
						className={tabButtonClasses('security')}
					>
						<MdOutlineSecurity size={20} /> Security
					</button>
				</div>

				{/* Tab Content */}
				<div className='flex-1 bg-white rounded-lg shadow p-6'>
					{activeTab === 'account' && <AccountSettings />}
					{activeTab === 'security' && <SecuritySettings />}
				</div>
			</div>
		</div>
	);
}
