create database Tiem;

CREATE TABLE Tiem.facilities
(
	id int(11) PRIMARY KEY AUTO_INCREMENT,
	name nvarchar (50),
	phone varchar (15),
	address nvarchar (100),
    created_at datetime NOT NULL,
	updated_at datetime NOT NULL,
	id_created int NOT NULL,
	id_updated int NOT NULL,
	deleteflag int NOT NULL,
	oldid int NOT NULL
);

CREATE TABLE Tiem.employee 
(
	id int(11) PRIMARY KEY AUTO_INCREMENT,
	name nvarchar (50) ,
	date_of_birth date,
	position nvarchar (50) ,
	degree nvarchar (50) ,
	salary float,
	address nvarchar (50) ,
	phone varchar (15),
	email varchar(200),
	username varchar (50),
	password varchar (50),
	role int,
	code varchar(10),
	checkcode boolean,
	loginfirst boolean,
	id_facilitie int,
	FOREIGN KEY(id_facilitie) REFERENCES facilities(id),
	created_at datetime NOT NULL,
	updated_at datetime NOT NULL,
	id_created int NOT NULL,
	id_updated int NOT NULL,
	deleteflag int NOT NULL,
	oldid int NOT NULL
);
CREATE TABLE Tiem.insurance -- Bảo hiểm
(
	id int(11) PRIMARY KEY AUTO_INCREMENT,
	name text,
	object nvarchar(200),
	subsidize int,
	created_at datetime NOT NULL,
	updated_at datetime NOT NULL,
	id_created int NOT NULL,
	id_updated int NOT NULL,
	deleteflag int NOT NULL,
	oldid int NOT NULL
);
CREATE TABLE Tiem.client -- Khách hàng
(
	id int(11) PRIMARY KEY AUTO_INCREMENT,
	name nvarchar (50) ,
	date_of_birth date,
	address nvarchar (50) ,
	phone varchar (15),
	email varchar(200),
	username varchar (50),
	password varchar (50),
	code varchar(10),
	checkcode boolean,
	loginfirst boolean,
	id_insurance int,
	FOREIGN KEY(id_insurance) REFERENCES insurance(id),
	created_at datetime NOT NULL,
	updated_at datetime NOT NULL,
	id_created int NOT NULL,
	id_updated int NOT NULL,
	deleteflag int NOT NULL,
	oldid int NOT NULL
);
CREATE TABLE Tiem.homie -- Người nhà
(
	id int(11) PRIMARY KEY AUTO_INCREMENT,
	name nvarchar (50) ,
	relationship nvarchar(50),
	phone varchar (15),
    id_client int,
	FOREIGN KEY(id_client) REFERENCES client(id),
	created_at datetime NOT NULL,
	updated_at datetime NOT NULL,
	id_created int NOT NULL,
	id_updated int NOT NULL,
	deleteflag int NOT NULL,
	oldid int NOT NULL
);
CREATE TABLE Tiem.typeProduct
(
	id int(11) PRIMARY KEY AUTO_INCREMENT,
	name nvarchar (50),
	unit nvarchar(50),
	created_at datetime NOT NULL,
	updated_at datetime NOT NULL,
	id_created int NOT NULL,
	id_updated int NOT NULL,
	deleteflag int NOT NULL,
	oldid int NOT NULL
);
CREATE TABLE Tiem.product
(
	id int(11) PRIMARY KEY AUTO_INCREMENT,
	name nvarchar (50),
	quantity int,
	import_price float,
	output_price float,
	manufacture_date date,
	expiry_date date,
	user_object nvarchar (50),
	lot_number varchar (50),
	protect nvarchar (50),	
    origin_country nvarchar(100),
    id_type_product int,
	FOREIGN KEY(id_type_product) REFERENCES typeProduct(id),
	created_at datetime NOT NULL,
	updated_at datetime NOT NULL,
	id_created int NOT NULL,
	id_updated int NOT NULL,
	deleteflag int NOT NULL,
	oldid int NOT NULL
);

CREATE TABLE Tiem.prevention -- phòng bệnh
(
	id int(11) PRIMARY KEY AUTO_INCREMENT,
	name nvarchar (50),
	user_object nvarchar (50),
	reason nvarchar (255),
	symptom nvarchar (255),
	prevent nvarchar (255),
	created_at datetime NOT NULL,
	updated_at datetime NOT NULL,
	id_created int NOT NULL,
	id_updated int NOT NULL,
	deleteflag int NOT NULL,
	oldid int NOT NULL
);
CREATE TABLE Tiem.payment
(
	id int(11) PRIMARY KEY AUTO_INCREMENT,
	price_total float,
	id_employee int,
	id_facilitie int,
	id_client int,
    single_or_package boolean,
	FOREIGN KEY (id_employee) REFERENCES employee(id),
	FOREIGN KEY (id_facilitie) REFERENCES facilities(id),
	FOREIGN KEY (id_client) REFERENCES client(id),
	created_at datetime NOT NULL,
	updated_at datetime NOT NULL,
	id_created int NOT NULL,
	id_updated int NOT NULL,
	deleteflag int NOT NULL,
	oldid int NOT NULL
);

CREATE TABLE Tiem.paymentDetail
(
	id int(11) PRIMARY KEY AUTO_INCREMENT,
	quantity int,
	price float,
	id_product int,
	id_payment int,
	FOREIGN KEY (id_product) REFERENCES product(id),
	FOREIGN KEY (id_payment) REFERENCES payment(id),
	created_at datetime NOT NULL,
	updated_at datetime NOT NULL,
	id_created int NOT NULL,
	id_updated int NOT NULL,
	deleteflag int NOT NULL,
	oldid int NOT NULL
);

CREATE TABLE Tiem.typeService  -- danh mục gói
(
	id int(11) PRIMARY KEY AUTO_INCREMENT,
	name text,
	created_at datetime NOT NULL,
	updated_at datetime NOT NULL,
	id_created int NOT NULL,
	id_updated int NOT NULL,
	deleteflag int NOT NULL,
	oldid int NOT NULL
);

CREATE TABLE Tiem.service -- gói
(
	id int(11) PRIMARY KEY AUTO_INCREMENT,
    name text,
    price_total float,
    id_type_sẻvice int,
	FOREIGN KEY (id_type_sẻvice) REFERENCES typeService(id),
	created_at datetime NOT NULL,
	updated_at datetime NOT NULL,
	id_created int NOT NULL,
	id_updated int NOT NULL,
	deleteflag int NOT NULL,
	oldid int NOT NULL
);

CREATE TABLE Tiem.serviceDetail -- chi tiết gói
(
	id int(11) PRIMARY KEY AUTO_INCREMENT,
    quantity int,
    id_sẻvice int,
	id_product int,
	FOREIGN KEY (id_sẻvice) REFERENCES service(id),
	FOREIGN KEY (id_product) REFERENCES product(id),
	created_at datetime NOT NULL,
	updated_at datetime NOT NULL,
	id_created int NOT NULL,
	id_updated int NOT NULL,
	deleteflag int NOT NULL,
	oldid int NOT NULL
);

CREATE TABLE Tiem.billIn -- hệ thống nhập
(
	id int(11) PRIMARY KEY AUTO_INCREMENT,
	price_total float,
	created_at datetime NOT NULL,
	updated_at datetime NOT NULL,
	id_created int NOT NULL,
	id_updated int NOT NULL,
	deleteflag int NOT NULL,
	oldid int NOT NULL
);

CREATE TABLE Tiem.billInDetail
(
	id int(11) PRIMARY KEY AUTO_INCREMENT,
    quantity int,
	price float,
	id_bill_in int,
    id_product int,
    FOREIGN KEY(id_bill_in) REFERENCES billIn(id),
    FOREIGN KEY(id_product) REFERENCES product(id),
	created_at datetime NOT NULL,
	updated_at datetime NOT NULL,
	id_created int NOT NULL,
	id_updated int NOT NULL,
	deleteflag int NOT NULL,
	oldid int NOT NULL
);

CREATE TABLE Tiem.status -- trạng thái của phiếu xuất
(
	id int(11) PRIMARY KEY AUTO_INCREMENT,
    name nvarchar(100),
	created_at datetime NOT NULL,
	updated_at datetime NOT NULL,
	id_created int NOT NULL,
	id_updated int NOT NULL,
	deleteflag int NOT NULL,
	oldid int NOT NULL
);

CREATE TABLE Tiem.billOut -- hệ thống xuất sản phẩm cho các cơ sở con
(
	id int(11) PRIMARY KEY AUTO_INCREMENT,
    id_status int,
    FOREIGN KEY(id_status) REFERENCES status(id),
	created_at datetime NOT NULL,
	updated_at datetime NOT NULL,
	id_created int NOT NULL,
	id_updated int NOT NULL,
	deleteflag int NOT NULL,
	oldid int NOT NULL
);

CREATE TABLE Tiem.billOutDetail
(
	id int(11) PRIMARY KEY AUTO_INCREMENT,
    quantity int,
	id_bill_out int,
    id_product int,
    FOREIGN KEY(id_bill_out) REFERENCES billOut(id),
    FOREIGN KEY(id_product) REFERENCES product(id),
	created_at datetime NOT NULL,
	updated_at datetime NOT NULL,
	id_created int NOT NULL,
	id_updated int NOT NULL,
	deleteflag int NOT NULL,
	oldid int NOT NULL
);

CREATE TABLE Tiem.request -- các cơ sở con yêu cầu cung cấp thuốc
(
	id int(11) PRIMARY KEY AUTO_INCREMENT,
    date date,
    id_facilitie int,
	idcreate int,
    idupdate int,
    FOREIGN KEY(idcreate) REFERENCES employee(id),
    FOREIGN KEY(idupdate) REFERENCES employee(id),
    FOREIGN KEY(id_facilitie) REFERENCES facilities(id),
	created_at datetime NOT NULL,
	updated_at datetime NOT NULL,
	id_created int NOT NULL,
	id_updated int NOT NULL,
	deleteflag int NOT NULL,
	oldid int NOT NULL
);

CREATE TABLE Tiem.requestDetail
(
	id int(11) PRIMARY KEY AUTO_INCREMENT,
    quantity int,
	id_request int,
    id_product int,
    FOREIGN KEY(id_request) REFERENCES request(id),
    FOREIGN KEY(id_product) REFERENCES product(id),
	created_at datetime NOT NULL,
	updated_at datetime NOT NULL,
	id_created int NOT NULL,
	id_updated int NOT NULL,
	deleteflag int NOT NULL,
	oldid int NOT NULL
);

CREATE TABLE Tiem.storageRoom -- số lượng các sản phẩm trong kho của các cơ sở con
(
	id int(11) PRIMARY KEY AUTO_INCREMENT,
    id_facilitie int,
    id_product int,
    quantity int,
    FOREIGN KEY(id_facilitie) REFERENCES facilities(id),
    FOREIGN KEY(id_product) REFERENCES product(id),
	created_at datetime NOT NULL,
	updated_at datetime NOT NULL,
	id_created int NOT NULL,
	id_updated int NOT NULL,
	deleteflag int NOT NULL,
	oldid int NOT NULL
);

CREATE TABLE Tiem.storageRoomOut -- cơ sở xuất kho để tiêm
(
	id int(11) PRIMARY KEY AUTO_INCREMENT,
    id_create int,
    id_employee int,
    FOREIGN KEY(id_create) REFERENCES employee(id),
    FOREIGN KEY(id_employee) REFERENCES employee(id),
	created_at datetime NOT NULL,
	updated_at datetime NOT NULL,
	id_created int NOT NULL,
	id_updated int NOT NULL,
	deleteflag int NOT NULL,
	oldid int NOT NULL
);

CREATE TABLE Tiem.clientServiceDetail -- Gói của khách hàng
(
	id int(11) PRIMARY KEY AUTO_INCREMENT,
    id_client int,
    id_service_detail int,
    status boolean,
    FOREIGN KEY(id_client) REFERENCES client(id),
    FOREIGN KEY(id_service_detail) REFERENCES serviceDetail(id),
	created_at datetime NOT NULL,
	updated_at datetime NOT NULL,
	id_created int NOT NULL,
	id_updated int NOT NULL,
	deleteflag int NOT NULL,
	oldid int NOT NULL
);

CREATE TABLE Tiem.storageRoomOutDetail
(
	id int(11) PRIMARY KEY AUTO_INCREMENT,
    quantity int,
    id_storageroom_out int,
    FOREIGN KEY(id_storageroom_out) REFERENCES storageRoomOut(id),
	created_at datetime NOT NULL,
	updated_at datetime NOT NULL,
	id_created int NOT NULL,
	id_updated int NOT NULL,
	deleteflag int NOT NULL,
	oldid int NOT NULL
);


CREATE TABLE Tiem.register -- khách hàng đăng ký tiêm
(
	id int(11) PRIMARY KEY AUTO_INCREMENT,
	name nvarchar(200),
	date_of_birth date,
	phone varchar(15),
	date date,
	id_service int,
	id_product int,
	id_facilitie int,
	FOREIGN KEY (id_service) REFERENCES service(id),
	FOREIGN KEY (id_product) REFERENCES product(id),
	FOREIGN KEY(id_facilitie) REFERENCES facilities(id),
	created_at datetime NOT NULL,
	updated_at datetime NOT NULL,
	id_created int NOT NULL,
	id_updated int NOT NULL,
	deleteflag int NOT NULL,
	oldid int NOT NULL
);