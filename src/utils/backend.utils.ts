export const isValidUUID = (uuid: string) => {
  const isValid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(uuid);

  return isValid
}

export const removeLeadingZero = (serial: number):number => {
  const serialStr = serial.toString()
  const cleaned = parseInt(serialStr, 10)

  return cleaned
}

export const addLeadingZero = (serial: number):string => {
    const serialStr = serial.toString()
  const padded = serialStr.padStart(6, '0')

  return padded
}