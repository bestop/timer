'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

// 计算一年的天数（考虑闰年）
const getDaysInYear = (year: number) => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 366 : 365
}

// 计算一年的第几天
const getDayOfYear = (date: Date) => {
  const start = new Date(date.getFullYear(), 0, 0)
  const diff = date.getTime() - start.getTime()
  const oneDay = 1000 * 60 * 60 * 24
  return Math.floor(diff / oneDay)
}

// 计算一个月的天数
const getDaysInMonth = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth()
  return new Date(year, month + 1, 0).getDate()
}

// 环形进度条组件
const CircularProgressBar = ({ 
  value, 
  size = 200, 
  strokeWidth = 8,
  children 
}: { 
  value: number
  size?: number
  strokeWidth?: number
  children: React.ReactNode
}) => {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDashoffset = circumference - (value / 100) * circumference

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        {/* 背景圆 */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-muted"
          style={{ opacity: 0.2 }}
        />
        {/* 进度圆 */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="text-primary transition-all duration-500 ease-in-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  )
}

export default function Home() {
  const [now, setNow] = useState(new Date())
  const [currentAge, setCurrentAge] = useState(25)
  const [lifeExpectancy, setLifeExpectancy] = useState(78)
  const [showSettings, setShowSettings] = useState(false)
  const [tempAge, setTempAge] = useState(25)
  const [tempExpectancy, setTempExpectancy] = useState(78)
  const [mounted, setMounted] = useState(false)

  // 标记组件已挂载到客户端并从 localStorage 读取数据
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    setMounted(true)
    const savedAge = localStorage.getItem('lifeClockCurrentAge')
    const savedExpectancy = localStorage.getItem('lifeClockExpectancy')
    
    if (savedAge) {
      setCurrentAge(parseFloat(savedAge))
      setTempAge(parseFloat(savedAge))
    }
    if (savedExpectancy) {
      setLifeExpectancy(parseFloat(savedExpectancy))
      setTempExpectancy(parseFloat(savedExpectancy))
    }
  }, [])
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // 保存设置到 localStorage
  const handleSaveSettings = () => {
    setCurrentAge(tempAge)
    setLifeExpectancy(tempExpectancy)
    if (mounted) {
      localStorage.setItem('lifeClockCurrentAge', tempAge.toString())
      localStorage.setItem('lifeClockExpectancy', tempExpectancy.toString())
    }
    setShowSettings(false)
  }

  const handleCancelSettings = () => {
    setTempAge(currentAge)
    setTempExpectancy(lifeExpectancy)
    setShowSettings(false)
  }

  // 计算各项时间数据
  const dayData = {
    passed: now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds(),
    total: 24 * 3600,
    percentage: ((now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds()) / (24 * 3600)) * 100
  }

  const monthData = {
    passed: now.getDate() - 1 + (now.getHours() / 24),
    total: getDaysInMonth(now),
    percentage: ((now.getDate() - 1 + (now.getHours() / 24)) / getDaysInMonth(now)) * 100
  }

  const yearData = {
    passed: getDayOfYear(now) - 1 + (now.getHours() / 24),
    total: getDaysInYear(now.getFullYear()),
    percentage: ((getDayOfYear(now) - 1 + (now.getHours() / 24)) / getDaysInYear(now.getFullYear())) * 100
  }

  const lifeData = {
    passed: currentAge,
    total: lifeExpectancy,
    percentage: (currentAge / lifeExpectancy) * 100
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('zh-CN', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit',
      hour12: false 
    })
  }

  const formatHoursMinutes = (hours: number) => {
    const h = Math.floor(hours)
    const m = Math.floor((hours - h) * 60)
    return `${h}小时 ${m}分钟`
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-muted/20">
      {/* 头部 */}
      <header className="py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            时光机
          </h1>
          <p className="text-muted-foreground text-lg">
            感受时间的流逝，珍惜每一个当下
          </p>
        </div>
      </header>

      {/* 主内容 */}
      <main className="flex-1 px-4 pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            
            {/* 日时钟 */}
            <Card className="border-2 hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-xl">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-semibold flex items-center justify-center gap-2">
                  <span className="text-2xl">🌅</span>
                  日时钟
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-6">
                {mounted ? (
                  <>
                    <CircularProgressBar value={dayData.percentage} size={220} strokeWidth={12}>
                      <div className="text-center">
                        <div className="text-4xl md:text-5xl font-bold tracking-tight">
                          {formatTime(now)}
                        </div>
                        <div className="text-sm text-muted-foreground mt-2">
                          今天已过 {formatHoursMinutes(now.getHours() + now.getMinutes() / 60)}
                        </div>
                      </div>
                    </CircularProgressBar>
                    <div className="w-full space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">已用时间</span>
                        <span className="font-medium text-primary">
                          {formatHoursMinutes(now.getHours() + now.getMinutes() / 60)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">剩余时间</span>
                        <span className="font-medium">
                          {formatHoursMinutes(24 - now.getHours() - now.getMinutes() / 60)}
                        </span>
                      </div>
                      <Progress value={dayData.percentage} className="h-2" />
                      <div className="text-center text-xs text-muted-foreground mt-1">
                        {dayData.percentage.toFixed(1)}%
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <CircularProgressBar value={0} size={220} strokeWidth={12}>
                      <div className="text-center">
                        <div className="text-4xl md:text-5xl font-bold tracking-tight">
                          --:--:--
                        </div>
                        <div className="text-sm text-muted-foreground mt-2">
                          加载中...
                        </div>
                      </div>
                    </CircularProgressBar>
                    <div className="w-full space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">已用时间</span>
                        <span className="font-medium text-primary">
                          --
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">剩余时间</span>
                        <span className="font-medium">
                          --
                        </span>
                      </div>
                      <Progress value={0} className="h-2" />
                      <div className="text-center text-xs text-muted-foreground mt-1">
                        --
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* 月时钟 */}
            <Card className="border-2 hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-xl">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-semibold flex items-center justify-center gap-2">
                  <span className="text-2xl">📅</span>
                  月时钟
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-6">
                {mounted ? (
                  <>
                    <CircularProgressBar value={monthData.percentage} size={220} strokeWidth={12}>
                      <div className="text-center">
                        <div className="text-5xl md:text-6xl font-bold tracking-tight">
                          {now.getDate()}
                        </div>
                        <div className="text-sm text-muted-foreground mt-2">
                          {now.toLocaleDateString('zh-CN', { month: 'long', year: 'numeric' })}
                        </div>
                      </div>
                    </CircularProgressBar>
                    <div className="w-full space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">已用天数</span>
                        <span className="font-medium text-primary">
                          {monthData.passed.toFixed(1)} 天
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">剩余天数</span>
                        <span className="font-medium">
                          {(monthData.total - monthData.passed).toFixed(1)} 天
                        </span>
                      </div>
                      <Progress value={monthData.percentage} className="h-2" />
                      <div className="text-center text-xs text-muted-foreground mt-1">
                        {monthData.percentage.toFixed(1)}%
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <CircularProgressBar value={0} size={220} strokeWidth={12}>
                      <div className="text-center">
                        <div className="text-5xl md:text-6xl font-bold tracking-tight">
                          --
                        </div>
                        <div className="text-sm text-muted-foreground mt-2">
                          加载中...
                        </div>
                      </div>
                    </CircularProgressBar>
                    <div className="w-full space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">已用天数</span>
                        <span className="font-medium text-primary">
                          --
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">剩余天数</span>
                        <span className="font-medium">
                          --
                        </span>
                      </div>
                      <Progress value={0} className="h-2" />
                      <div className="text-center text-xs text-muted-foreground mt-1">
                        --
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* 年时钟 */}
            <Card className="border-2 hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-xl">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-semibold flex items-center justify-center gap-2">
                  <span className="text-2xl">🌟</span>
                  年时钟
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-6">
                {mounted ? (
                  <>
                    <CircularProgressBar value={yearData.percentage} size={220} strokeWidth={12}>
                      <div className="text-center">
                        <div className="text-5xl md:text-6xl font-bold tracking-tight">
                          {getDayOfYear(now) - 1}
                        </div>
                        <div className="text-sm text-muted-foreground mt-2">
                          {now.getFullYear()} 年
                        </div>
                      </div>
                    </CircularProgressBar>
                    <div className="w-full space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">已用天数</span>
                        <span className="font-medium text-primary">
                          {yearData.passed.toFixed(1)} 天
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">剩余天数</span>
                        <span className="font-medium">
                          {(yearData.total - yearData.passed).toFixed(1)} 天
                        </span>
                      </div>
                      <Progress value={yearData.percentage} className="h-2" />
                      <div className="text-center text-xs text-muted-foreground mt-1">
                        {yearData.percentage.toFixed(1)}%
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <CircularProgressBar value={0} size={220} strokeWidth={12}>
                      <div className="text-center">
                        <div className="text-5xl md:text-6xl font-bold tracking-tight">
                          --
                        </div>
                        <div className="text-sm text-muted-foreground mt-2">
                          加载中...
                        </div>
                      </div>
                    </CircularProgressBar>
                    <div className="w-full space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">已用天数</span>
                        <span className="font-medium text-primary">
                          --
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">剩余天数</span>
                        <span className="font-medium">
                          --
                        </span>
                      </div>
                      <Progress value={0} className="h-2" />
                      <div className="text-center text-xs text-muted-foreground mt-1">
                        --
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* 人生时钟 */}
            <Card className="border-2 hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-xl">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-semibold flex items-center justify-center gap-2">
                  <span className="text-2xl">💫</span>
                  人生时钟
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-6">
                {showSettings ? (
                  <div className="w-full space-y-4 p-2">
                    <div className="space-y-2">
                      <Label htmlFor="currentAge">当前年龄（岁）</Label>
                      <Input
                        id="currentAge"
                        type="number"
                        step="0.1"
                        min="0"
                        max="150"
                        value={tempAge}
                        onChange={(e) => setTempAge(parseFloat(e.target.value) || 0)}
                        className="text-lg"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lifeExpectancy">预期寿命（岁）</Label>
                      <Input
                        id="lifeExpectancy"
                        type="number"
                        step="1"
                        min="1"
                        max="200"
                        value={tempExpectancy}
                        onChange={(e) => setTempExpectancy(parseFloat(e.target.value) || 78)}
                        className="text-lg"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleSaveSettings} className="flex-1">
                        保存
                      </Button>
                      <Button onClick={handleCancelSettings} variant="outline" className="flex-1">
                        取消
                      </Button>
                    </div>
                  </div>
                ) : mounted ? (
                  <>
                    <CircularProgressBar value={Math.min(lifeData.percentage, 100)} size={220} strokeWidth={12}>
                      <div className="text-center">
                        <div className="text-5xl md:text-6xl font-bold tracking-tight">
                          {lifeData.passed.toFixed(1)}
                        </div>
                        <div className="text-sm text-muted-foreground mt-2">
                          岁 / {lifeExpectancy} 岁
                        </div>
                      </div>
                    </CircularProgressBar>
                    <div className="w-full space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">已用年份</span>
                        <span className="font-medium text-primary">
                          {lifeData.passed.toFixed(2)} 年
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">剩余年份</span>
                        <span className="font-medium">
                          {(lifeData.total - lifeData.passed).toFixed(2)} 年
                        </span>
                      </div>
                      <Progress value={Math.min(lifeData.percentage, 100)} className="h-2" />
                      <div className="text-center text-xs text-muted-foreground mt-1">
                        {Math.min(lifeData.percentage, 100).toFixed(1)}%
                      </div>
                    </div>
                    <Button
                      onClick={() => {
                        setTempAge(currentAge)
                        setTempExpectancy(lifeExpectancy)
                        setShowSettings(true)
                      }}
                      variant="outline"
                      className="w-full"
                    >
                      设置年龄
                    </Button>
                  </>
                ) : (
                  <>
                    <CircularProgressBar value={0} size={220} strokeWidth={12}>
                      <div className="text-center">
                        <div className="text-5xl md:text-6xl font-bold tracking-tight">
                          --
                        </div>
                        <div className="text-sm text-muted-foreground mt-2">
                          加载中...
                        </div>
                      </div>
                    </CircularProgressBar>
                    <div className="w-full space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">已用年份</span>
                        <span className="font-medium text-primary">
                          --
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">剩余年份</span>
                        <span className="font-medium">
                          --
                        </span>
                      </div>
                      <Progress value={0} className="h-2" />
                      <div className="text-center text-xs text-muted-foreground mt-1">
                        --
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full"
                      disabled
                    >
                      设置年龄
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>

          </div>
        </div>
      </main>

      {/* 页脚 */}
      <footer className="py-6 px-4 border-t bg-muted/30 mt-auto">
        <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          <p>时光不语，却回答了所有问题</p>
        </div>
      </footer>
    </div>
  )
}
