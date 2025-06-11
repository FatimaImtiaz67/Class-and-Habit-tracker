// src/stores/classStore.js

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useClassesStore = create(
	persist(
		(set, get) => ({
			classes: [],

			classesDispatch: ({ type, data, classCode }) => {
				const prev = get().classes;
				let updated = [];

				switch (type) {
					case 'addClass':
						updated = [...prev, { ...data, isArchived: false, id: Date.now() }];
						break;

					case 'editClass':
						updated = prev.map((cls) =>
							cls.id === data.id ? { ...cls, ...data } : cls
						);
						break;

					case 'deleteClass':
						updated = prev.filter((cls) => cls.code !== classCode);
						break;

					case 'archiveClass':
						updated = prev.map((cls) =>
							cls.code === classCode ? { ...cls, isArchived: true } : cls
						);
						break;

					case 'unarchiveClass':
						updated = prev.map((cls) =>
							cls.code === classCode ? { ...cls, isArchived: false } : cls
						);
						break;

					default:
						updated = prev;
						break;
				}

				set({ classes: updated });
			},
		}),
		{
			name: 'classes-storage',
		}
	)
);
