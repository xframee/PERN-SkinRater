CREATE TABLE skin_info(
    skin_id SERIAL PRIMARY KEY,
    skin_name VARCHAR(100) NOT NULL,
    skin_type CHAR(1) NOT NULL,
    skin_image VARCHAR(512) NOT NULL
);

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(64) NOT NULL
    CHECK (char_length(user_name) > 4 ), 
    user_password VARCHAR(64) NOT NULL
    CHECK (char_length(user_password) > 6)
);

CREATE TABLE ratings(
    skin_id INT PRIMARY KEY,
    avg_rating INT NOT NULL,
    numvotes INT NOT NULL,
    FOREIGN KEY (skin_id) REFERENCES skin_info(skin_id)
);

CREATE TABLE user_ratings(
    user_id INT,
    skin_id INT,
    rating INT NOT NULL,
    PRIMARY KEY (user_id, skin_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (skin_id) REFERENCES skin_info(skin_id)
);

insert into skin_info(skin_name, skin_type, skin_image) 
values('Desert Eagle | Hypnotic', 'W', 'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposr-kLAtl7PLJTitH_si_k4-0m_7zO6-flW9U6ZN0juyVpdym2QftqhFkYTqncofEcA9qZwzS81bsw-66jJO1u4OJlyW5goh8Mg/360fx360f');

insert into skin_info(skin_name, skin_type, skin_image)
values('AK-47 | Case Hardened', 'W', 'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhhwszHeDFH6OO6nYeDg7mhYe6Bw24H7cQm3rnFrdj23gHk-BJrMDr3dtDDclQ2YVnQ-AW4lem8m9bi65T-nsCo/360fx360f'),
('Glock-18 | Dragon Tattoo', 'W', 'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposbaqKAxf0v73dS9D69O4q4eHmPT_DLfYkWNFppUl07CU89r3igHj-xc4Z2CicoeXJwY9ZAnVqAe7kL_pjMK8vZrLz3J9-n51OBEjsBw/360fx360f'),
('USP-S | Dark Water', 'W', 'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoo6m1FBRp3_bGcjhQ0927q5qOleX1DL_QhGBu5Mx2gv2P992hjVLkqUNoYmj0coDHcAc3YgrU-lDryLrp15Xuv8jAn3Q2unQms2GdwUJMFA0DwQ/360fx360f'),
('M4A1-S | Dark Water', 'W', 'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO3mb-RkvXmMoTVl3la18l4jeHVu9r03ALg_xBqZmz6cYSTcVI-Nw3R-1e6wea608fo7Z3OmnpmvXMk5nbD30vgiZz5yJw/360fx360f'),
('AUG | Wings', 'W', 'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot6-iFA957PXNcClK6c6lq4GekMj4OrzZgiUGsZwi0uqV9NWh2VG1rRdpa22iIoaRcFRtMlGD8gW9l-nu1J_o7Z-a1zI97V_yTJJL/360fx360f'),
('SG 553 | Ultraviolet', 'W', 'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopb3wflFfwPz3YShQ_NCzq4yCkP_gfeqEwWoGu5F30-2X8NWk3FfhqRVrNmmmcIPHcVc7NVvXq1LoyL3m05ai_MOewurX7_8/360fx360f'),
('MP7 | Skulls', 'W', 'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou6ryFA957ODDZDFO_-O6nYeDg7mjMu_Ql2hSvZ0ojO2V89TzigXk-hE_Zm6gJYDDewM4MA2BqAW2xr3tm9bi6_W9ygvN/360fx360f'),
('Glock-18 | Fade', 'W', 'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposbaqKAxf0vL3dzxG6eO6nYeDg7n1a-6GkDoC7pMp3rGYpNqiiQ23-UM5ZT-hcIeQJgZsMFvR_lTox7i-m9bi6-pjfulG/360fx360f'),
('MP9 | Bulldozer', 'W', 'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou6r8FBRv7OrNfTFN--O6nYeDg7nxNr6ExjtV65Yl3b_E84iliQ2wqhU-Nj_2J4CSdAZrNQrS8lC_yerpm9bi6wdzHfqY/360fx360f');
