'use server';

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// === COFFEE BEANS ===

export async function createCoffeeBean(formData: FormData) {
  const name = formData.get('name') as string;
  const price = parseFloat(formData.get('price') as string);
  const stock = parseInt(formData.get('stock') as string, 10);
  const category = formData.get('category') as string;
  
  // Roasted specific
  const roast_level = formData.get('roast_level') as string;
  const brewing_recommendations = formData.get('brewing_recommendations') as string;

  // Green / Shared specifications
  const species = formData.get('species') as string;
  const variety = formData.get('variety') as string;
  const process = formData.get('process') as string;
  const fermentation = formData.get('fermentation') as string;
  const fermentation_temp = formData.get('fermentation_temp') as string;
  const origin = formData.get('origin') as string;
  const elevation = formData.get('elevation') as string;
  const drying_method = formData.get('drying_method') as string;
  const harvest_period = formData.get('harvest_period') as string;
  const sensory_notes = formData.get('sensory_notes') as string;
  const story = formData.get('story') as string;
  const cup_character = formData.get('cup_character') as string;
  const availability = formData.get('availability') as string;
  const min_order_qty = formData.get('min_order_qty') as string;
  const packaging = formData.get('packaging') as string;

  const imageUrls = [
    formData.get('image_url_1') as string,
    formData.get('image_url_2') as string,
    formData.get('image_url_3') as string,
    formData.get('image_url_4') as string,
  ].map(url => url ? url.trim() : '').filter(url => url !== '');

  const { error } = await supabase.from('coffee_beans').insert([
    {
      name,
      price,
      stock,
      category,
      roast_level,
      brewing_recommendations,
      species,
      variety,
      process,
      fermentation,
      fermentation_temp,
      origin,
      elevation,
      drying_method,
      harvest_period,
      sensory_notes,
      story,
      cup_character,
      availability,
      min_order_qty,
      packaging,
      image_url: imageUrls
    }
  ]);

  if (error) throw new Error(error.message);
  
  revalidatePath('/admin/coffee-beans');
  redirect('/admin/coffee-beans');
}

export async function updateCoffeeBean(id: string, formData: FormData) {
  const name = formData.get('name') as string;
  const price = parseFloat(formData.get('price') as string);
  const stock = parseInt(formData.get('stock') as string, 10);
  const category = formData.get('category') as string;
  
  // Roasted specific
  const roast_level = formData.get('roast_level') as string;
  const brewing_recommendations = formData.get('brewing_recommendations') as string;

  // Green / Shared specifications
  const species = formData.get('species') as string;
  const variety = formData.get('variety') as string;
  const process = formData.get('process') as string;
  const fermentation = formData.get('fermentation') as string;
  const fermentation_temp = formData.get('fermentation_temp') as string;
  const origin = formData.get('origin') as string;
  const elevation = formData.get('elevation') as string;
  const drying_method = formData.get('drying_method') as string;
  const harvest_period = formData.get('harvest_period') as string;
  const sensory_notes = formData.get('sensory_notes') as string;
  const story = formData.get('story') as string;
  const cup_character = formData.get('cup_character') as string;
  const availability = formData.get('availability') as string;
  const min_order_qty = formData.get('min_order_qty') as string;
  const packaging = formData.get('packaging') as string;

  const imageUrls = [
    formData.get('image_url_1') as string,
    formData.get('image_url_2') as string,
    formData.get('image_url_3') as string,
    formData.get('image_url_4') as string,
  ].map(url => url ? url.trim() : '').filter(url => url !== '');

  const { error } = await supabase.from('coffee_beans').update({
    name,
    price,
    stock,
    category,
    roast_level,
    brewing_recommendations,
    species,
    variety,
    process,
    fermentation,
    fermentation_temp,
    origin,
    elevation,
    drying_method,
    harvest_period,
    sensory_notes,
    story,
    cup_character,
    availability,
    min_order_qty,
    packaging,
    image_url: imageUrls,
    updated_at: new Date().toISOString()
  }).eq('id', id);

  if (error) throw new Error(error.message);

  revalidatePath('/admin/coffee-beans');
  redirect('/admin/coffee-beans');
}

export async function deleteCoffeeBean(id: string) {
  const { error } = await supabase.from('coffee_beans').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/admin/coffee-beans');
}

// === EVENTS ===

export async function createEvent(formData: FormData) {
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const badge = formData.get('badge') as string;
  const event_date = formData.get('event_date') as string;
  const event_time = formData.get('event_time') as string;
  const location = formData.get('location') as string;
  const venue_address = formData.get('venue_address') as string;
  const price = parseFloat(formData.get('price') as string || '0');
  const capacity = parseInt(formData.get('capacity') as string || '0', 10);
  const image_url = formData.get('image_url') as string;

  const host_name = formData.get('host_name') as string;
  const host_title = formData.get('host_title') as string;
  const host_avatar_url = formData.get('host_avatar_url') as string;
  const host_bio = formData.get('host_bio') as string;

  const whatsIncluded = [
    formData.get('whats_included_1') as string,
    formData.get('whats_included_2') as string,
    formData.get('whats_included_3') as string,
    formData.get('whats_included_4') as string,
  ].map(item => item ? item.trim() : '').filter(item => item !== '');

  const highlights = [
    { title: formData.get('highlight_title_1') as string, description: formData.get('highlight_desc_1') as string },
    { title: formData.get('highlight_title_2') as string, description: formData.get('highlight_desc_2') as string },
    { title: formData.get('highlight_title_3') as string, description: formData.get('highlight_desc_3') as string },
    { title: formData.get('highlight_title_4') as string, description: formData.get('highlight_desc_4') as string },
  ].filter(hl => hl.title && hl.title.trim() !== '');

  const { error } = await supabase.from('events').insert([
    {
      name,
      description,
      badge,
      event_date,
      event_time,
      location,
      venue_address,
      price,
      capacity,
      image_url,
      whats_included: whatsIncluded,
      host_name,
      host_title,
      host_avatar_url,
      host_bio,
      highlights
    }
  ]);

  if (error) throw new Error(error.message);
  
  revalidatePath('/admin/events');
  redirect('/admin/events');
}

export async function updateEvent(id: string, formData: FormData) {
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const badge = formData.get('badge') as string;
  const event_date = formData.get('event_date') as string;
  const event_time = formData.get('event_time') as string;
  const location = formData.get('location') as string;
  const venue_address = formData.get('venue_address') as string;
  const price = parseFloat(formData.get('price') as string || '0');
  const capacity = parseInt(formData.get('capacity') as string || '0', 10);
  const image_url = formData.get('image_url') as string;

  const host_name = formData.get('host_name') as string;
  const host_title = formData.get('host_title') as string;
  const host_avatar_url = formData.get('host_avatar_url') as string;
  const host_bio = formData.get('host_bio') as string;

  const whatsIncluded = [
    formData.get('whats_included_1') as string,
    formData.get('whats_included_2') as string,
    formData.get('whats_included_3') as string,
    formData.get('whats_included_4') as string,
  ].map(item => item ? item.trim() : '').filter(item => item !== '');

  const highlights = [
    { title: formData.get('highlight_title_1') as string, description: formData.get('highlight_desc_1') as string },
    { title: formData.get('highlight_title_2') as string, description: formData.get('highlight_desc_2') as string },
    { title: formData.get('highlight_title_3') as string, description: formData.get('highlight_desc_3') as string },
    { title: formData.get('highlight_title_4') as string, description: formData.get('highlight_desc_4') as string },
  ].filter(hl => hl.title && hl.title.trim() !== '');

  const { error } = await supabase.from('events').update({
    name,
    description,
    badge,
    event_date,
    event_time,
    location,
    venue_address,
    price,
    capacity,
    image_url,
    whats_included: whatsIncluded,
    host_name,
    host_title,
    host_avatar_url,
    host_bio,
    highlights,
    updated_at: new Date().toISOString()
  }).eq('id', id);

  if (error) throw new Error(error.message);

  revalidatePath('/admin/events');
  redirect('/admin/events');
}

export async function deleteEvent(id: string) {
  const { error } = await supabase.from('events').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/admin/events');
}

// === ORDERS ===

export async function updateOrderStatus(id: string, status: string) {
  const { error } = await supabase.from('orders').update({ status }).eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/admin/orders');
}

export async function deleteOrder(id: string) {
  const { error } = await supabase.from('orders').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/admin/orders');
}

// === REGISTRATIONS ===

export async function deleteRegistration(id: string) {
  const { error } = await supabase.from('event_registrations').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/admin/event-registrations');
}
