INSERT INTO tickets (
    customer_id, title, description, completed, tech, created_at, updated_at
) VALUES ('1', 'Engine won’t start', 'Customer reports the engine does not start despite a charged battery and full tank.', false, 'unassigned', now(), now()),
('1', 'Brake issues', 'Customer hears a squealing sound when braking and feels reduced stopping power.', false, 'unassigned', now(), now()),
('1', 'Oil change needed', 'Customer is due for an oil and filter change as part of routine maintenance.', false, 'unassigned', now(), now()),
('2', 'AC not cooling', 'Customer reports that the car air conditioning is blowing warm air.', false, 'unassigned', now(), now()),
('2', 'Flat tire', 'Customer has a flat front-left tire and needs it patched or replaced.', false, 'unassigned', now(), now()),
('2', 'Check engine light on', 'Check engine light is illuminated; customer requests a diagnostic scan.', false, 'unassigned', now(), now()),
('3', 'Battery replacement', 'Car won’t start after being parked overnight; customer suspects dead battery.', false, 'unassigned', now(), now()),
('3', 'Headlight not working', 'Passenger-side headlight is out and needs to be replaced.', false, 'unassigned', now(), now()),
('3', 'Steering wheel vibration', 'Customer feels strong vibrations in the steering wheel at highway speeds.', false, 'unassigned', now(), now()),
('4', 'Transmission slipping', 'Customer reports the car hesitates when shifting gears.', false, 'unassigned', now(), now()),
('4', 'Exhaust noise', 'Loud noise coming from the exhaust area, possible muffler damage.', false, 'unassigned', now(), now()),
('4', 'Wiper blades replacement', 'Windshield wipers are leaving streaks and need to be changed.', false, 'unassigned', now(), now()),
('5', 'Radiator leak', 'Customer notices coolant leaking under the vehicle after parking.', false, 'unassigned', now(), now()),
('5', 'Noisy suspension', 'Clunking sound from front suspension when driving over bumps.', false, 'unassigned', now(), now()),
('5', 'Alignment needed', 'Vehicle pulls to the right when driving straight.', false, 'unassigned', now(), now());
