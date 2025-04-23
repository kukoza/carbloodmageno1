"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Mail, Lock, Car } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function Login() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    // ตรวจสอบว่ามีพารามิเตอร์ logout=true หรือไม่
    const logout = searchParams.get("logout")
    if (logout === "true") {
      // แสดงข้อความแจ้งเตือนว่าออกจากระบบสำเร็จ
      toast({
        title: "ออกจากระบบสำเร็จ",
        description: "คุณได้ออกจากระบบเรียบร้อยแล้ว",
      })
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const formData = { email, password }

    const isValid = validateForm()

    if (!isValid) {
      return
    }

    setIsSubmitting(true)

    try {
      console.log("กำลังพยายามเข้าสู่ระบบด้วย:", { email })

      // ส่งคำขอไปยัง API เพื่อตรวจสอบข้อมูลผู้ใช้
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include", // ให้แน่ใจว่าจะรับ cookie กลับมา
      })

      console.log("สถานะการตอบกลับ:", response.status)
      const data = await response.json()
      console.log("ข้อมูลการตอบกลับ:", data)

      if (!response.ok) {
        throw new Error(data.error || "เกิดข้อผิดพลาดในการเข้าสู่ระบบ")
      }

      // นำทางไปยังหน้าที่เหมาะสมตามบทบาทของผู้ใช้  
      if (data.user.role === "ผู้ดูแลระบบ") {
        console.log("กำลังนำทางไปยังแดชบอร์ดผู้ดูแลระบบ")
        router.push("/admin/dashboard")
      } else {
        console.log("กำลังนำทางไปยังแดชบอร์ดผู้ใช้")
        router.push("/user/dashboard")
      }
    } catch (error: any) {
      console.error("เกิดข้อผิดพลาดในการเข้าสู่ระบบ:", error)
      setError(error.message || "อีเมลหรือรหัสผ่านไม่ถูกต้อง")
    } finally {
      setIsSubmitting(false)
    }
  }

  const validateForm = () => {
    let isValid = true
    const newErrors: { [key: string]: string } = {}

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email) {
      newErrors.email = "กรุณากรอกอีเมล"
      isValid = false
    } else if (!emailRegex.test(email)) {
      newErrors.email = "กรุณากรอกอีเมลให้ถูกต้อง"
      isValid = false
    }

    // Validate password
    if (!password) {
      newErrors.password = "กรุณากรอกรหัสผ่าน"
      isValid = false
    } else if (password.length < 6) {
      newErrors.password = "รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร"
      isValid = false
    }

    setError(Object.values(newErrors).join("\n") || "")
    return isValid
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
      <Toaster />
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-2">
            <Car className="h-6 w-6 text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">เข้าสู่ระบบ</CardTitle>
          <CardDescription className="text-center">เข้าสู่ระบบจองรถ Nozomi Enterprise</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                อีเมล
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="กรอกอีเมล"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                รหัสผ่าน
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="กรอกรหัสผ่าน"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <div className="bg-red-100 text-red-600 text-sm p-3 rounded-md">{error}</div>}

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
            ยังไม่มีบัญชี?{" "}
            <Link href="/register" className="text-blue-600 hover:underline">
              ลงทะเบียน
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
