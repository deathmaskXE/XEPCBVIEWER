export const normalizePhone=value=>String(value||'').replace(/\D/g,'');
export const whatsappUrl=(phone,message)=>`https://wa.me/${normalizePhone(phone)}?text=${encodeURIComponent(message)}`;
export const trackingMessage=(order,base=location.href.split('#')[0])=>`Hola. Tu pedido ${order.number} está ${order.statusLabel.toLowerCase()}. Seguimiento: ${base}#/seguimiento/${order.trackingToken}`;
