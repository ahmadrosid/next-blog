---
title: "Bagaimana mengatasi error nil pointer di Golang?"
date: "2022-12-30T10:34:33.208Z"
image: "/images/"
tags: "golang"
published: true
---

Secara cepat atau lambat saat kamu sedang menulis program dalam pemrogramman go kamu pasti akan menemui error berikut ini.

```
panic: runtime error: invalid memory address or nil pointer dereference
[signal SIGSEGV: segmentation violation code=0x2 addr=0x0 pc=0x1021ef40c]

goroutine 1 [running]:
main.main()
        /.../main.go:14 +0x1c
exit status 2
```

## Apa itu error nil pointer?
Di golang `nil` adalah sebuah penanda untuk memory kosong dalam setiap data yang kita buat. Sebagai contohnya kita membuat struct `User` lalu kita membuat *instance* baru dan tidak memberika nilai pada properti didalamnya. 

Sedangkan pointer adalah referensi terhadap suatu data yang ditandai dengan keyword `&`. Golang sendiri diadaptasi dari bahasa `C` yang mana dalam bahasa `C` juga menggunakan karakter `&` untuk membuat sebuah pointer.

Pointer ini sangat berguna jika kita ingin mengunakan sebuah data kedalam beberapa *function* tanpa harus menduplikatnya. Dengan begitu kita bisa membuat sebuah program yang lebih irit memory dan membuatnya lebih cepat.

Praktik menggunakan pointer ini sudah ada sejak jaman dahulu karena pada saat itu komputer yang ada tidak memiliki ram yang sangat besar seperti yang kita miliki saat ini. Akan tetapi meskipun begitu kita juga harus tetap bijak dalam menggunakan ram saat membuat sebuah program. 

Jangan mentang - mentang RAM komputer jaman sekarang ukurannya besar - besar kita se-enaknya saja menggunakan memory secara tidak optimal.

## Kenapa error nil pointer bisa terjadi?
Error nil pointer ini terjadi ketika kita mengkases sebuah data yang tidak ada nilai nya. Hal ini menjadi salah satu kelemahan dari golang, karena tidak ada mekanisme untuk mencegah keamanan penggunaan *memory*. Bahkan seorang yang sudah senior juga terkadang sering melakukan kesalan ini.

Secara umum error ini terjadi ketika kita mengambil data dari sebuah *function* yang mengembalikan referensi dari sebuah data. Kadang juga terjadi ketika kita lupa untuk mengecek apakah *function* yang kita panggil mengembalikan error atau tidak.

Sebagai contoh adalah `function` berikut ini.

```
function getUser() (*User, error) {...}
```

Function ini mengambalikan dua data yaitu pointer dari `User` dan `error`. Yang sering terjadi adalah pointer dari `User` akan memiliki nilai `nil` ketika nilai `error` tidak `nil`. 

## Contoh error nil pointer

Kita coba untuk membuat program yang sederhana untuk mensimulasikan *error nil pointer* ini.

```go
type User struct {
	name string
}

func main() {
	var data, _ = getData(true)
	name := data.name
	fmt.Printf("%+v\n", name)
}

func getData(shouldNotError bool) (*User, error) {
	if !shouldNotError {
		user := User{}
		user.name = "Ahmad Rosid"
		return &user, nil
	}
	return nil, errors.New("Failed to get data!")
}
```

Dari kode diatas kita bisa melihat error nil akan terjadi ketika kita mengakses data `user.name` karena function `getData` akan memberikan nil pointer untuk struct `User` karena kita memberikan *parameter* `shouldNotError` dengan nilai `true`.

## Cara mengatasi error error nil pointer
Cara untuk mengatasi error nil pointer ini sangat mudah yaitu dengan cukup memastikan kita tidak mengakses data yang nilainya adalah `nil`. Maka dari itu kita bisa melakukan pengencekan nilai dari data `User` dulu apakah dia nil ata tidak.

```go
var data, _ = getData(true)
if data != nil {
    name := data.name
    fmt.Printf("%+v\n", name)
}
```

Ada cara lain untuk mengatasi masalah ini. Kita tau dari function `getData` akan selalu memberikan `return` nil ketika terjai error. Jadi yang kita cek bukan lagi data nya tapi adalah error nya.

```go
var data, err = getData(true)
if err != nil {
    fmt.Printf(err.Error())
    return
}
name := data.name
fmt.Printf("%+v\n", name)
```

## Contoh kode

Dengan semua itu beginilah contoh kode nya secara lengkap untuk mengatasi error ini.

```go
package main

import (
	"errors"
	"fmt"
)

type User struct {
	name string
}

func main() {
	var data, err = getData(true)
	if err != nil {
		fmt.Println(err.Error())
	}
	name := data.name
	fmt.Printf("%+v\n", name)
}

func getData(shouldNotError bool) (*User, error) {
	if !shouldNotError {
		user := User{}
		user.name = "Ahmad Rosid"
		return &user, nil
	}
	return nil, errors.New("Failed to get data!")
}
```

## Kesimpulan

Sebagai penutup mari kita ulas lagi hal penting dari pembahasan kita kali ini.
- Golang tidak memiliki seknario untuk mencegah kesalah dalam mengkases sebuah memory.
- Nil pointer error terjadi ketika kita mengakses data yang yang berisi nil.
- Pointer adalah salah satu fitur untuk mengoptimalkan penggunaan memory di golang.
- Meskipun pointer bisa mempercepat program kita, dia juga bisa membuat kita terjebak error nil.
- Selalu pastikan kita melakukan pengecekan data yang kemungkinan memerikan nil pointer.
- Untuk mengetahui apakah sebuah kode berpotensi memberikan nilai nil bisa dengan mengecek function yang mengembalikan pointer yang di tandai dengan `return &...` dan `somefunction() *User...`.
