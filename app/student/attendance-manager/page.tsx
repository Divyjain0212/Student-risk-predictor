'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface AttendanceRecord {
  subject: string;
  attended: number;
  total: number;
  percentage: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  points: number;
}

interface GameStats {
  totalPoints: number;
  level: number;
  streakDays: number;
  rank: number;
  totalStudents: number;
}

export default function AttendanceManager() {
  const [attendanceData, setAttendanceData] = useState<AttendanceRecord[]>([
    { subject: 'Mathematics', attended: 18, total: 20, percentage: 90 },
    { subject: 'Physics', attended: 16, total: 20, percentage: 80 },
    { subject: 'Chemistry', attended: 14, total: 20, percentage: 70 },
    { subject: 'English', attended: 19, total: 20, percentage: 95 },
    { subject: 'Computer Science', attended: 15, total: 20, percentage: 75 }
  ]);

  const [gameStats, setGameStats] = useState<GameStats>({
    totalPoints: 1250,
    level: 5,
    streakDays: 7,
    rank: 23,
    totalStudents: 150
  });

  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: '1',
      title: 'Perfect Week',
      description: 'Attend all classes for 7 consecutive days',
      icon: '🏆',
      unlocked: true,
      points: 100
    },
    {
      id: '2',
      title: 'Math Master',
      description: 'Maintain 90%+ attendance in Mathematics',
      icon: '🔢',
      unlocked: true,
      points: 75
    },
    {
      id: '3',
      title: 'Consistency Champion',
      description: 'Maintain 80%+ attendance across all subjects',
      icon: '⭐',
      unlocked: false,
      points: 150
    },
    {
      id: '4',
      title: 'Early Bird',
      description: 'Never be late for 30 days',
      icon: '🌅',
      unlocked: false,
      points: 200
    }
  ]);

  const [dailyChallenge, setDailyChallenge] = useState({
    challenge: 'Attend all 4 classes today',
    progress: 3,
    total: 4,
    reward: 50
  });

  const markAttendance = (subject: string) => {
    setAttendanceData(prev => 
      prev.map(record => 
        record.subject === subject 
          ? {
              ...record,
              attended: record.attended + 1,
              total: record.total + 1,
              percentage: Math.round(((record.attended + 1) / (record.total + 1)) * 100)
            }
          : record
      )
    );

    // Update game stats
    setGameStats(prev => ({
      ...prev,
      totalPoints: prev.totalPoints + 25,
      streakDays: prev.streakDays + (Math.random() > 0.5 ? 1 : 0)
    }));

    // Update daily challenge
    if (dailyChallenge.progress < dailyChallenge.total) {
      setDailyChallenge(prev => ({
        ...prev,
        progress: prev.progress + 1
      }));
    }
  };

  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600 bg-green-100';
    if (percentage >= 75) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getProgressBarColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-green-500';
    if (percentage >= 75) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getLevelProgress = () => {
    // Calculate points needed for current level (level 1 = 0-199, level 2 = 200-399, etc.)
    const pointsForCurrentLevel = (gameStats.level - 1) * 200;
    const pointsForNextLevel = gameStats.level * 200;
    const currentLevelPoints = gameStats.totalPoints - pointsForCurrentLevel;
    const pointsNeededForLevel = pointsForNextLevel - pointsForCurrentLevel;
    
    // Ensure we don't exceed 100%
    const progress = Math.min((currentLevelPoints / pointsNeededForLevel) * 100, 100);
    return Math.max(progress, 0); // Ensure we don't go below 0%
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                📅 Attendance Manager & Gamification
              </h1>
              <p className="text-gray-600">
                Track your attendance, earn points, and compete with classmates!
              </p>
            </div>
            <Link href="/student-dashboard" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
              Back to Dashboard
            </Link>
          </div>
        </div>

        {/* Game Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-3xl mb-2">🏆</div>
            <h3 className="text-2xl font-bold text-yellow-600">{gameStats.totalPoints}</h3>
            <p className="text-gray-600">Total Points</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-3xl mb-2">📊</div>
            <h3 className="text-2xl font-bold text-blue-600">Level {gameStats.level}</h3>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{width: `${getLevelProgress()}%`}}></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {gameStats.totalPoints - ((gameStats.level - 1) * 200)}/{200} XP
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-3xl mb-2">🔥</div>
            <h3 className="text-2xl font-bold text-orange-600">{gameStats.streakDays}</h3>
            <p className="text-gray-600">Day Streak</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-3xl mb-2">🥇</div>
            <h3 className="text-2xl font-bold text-purple-600">#{gameStats.rank}</h3>
            <p className="text-gray-600">Class Rank</p>
          </div>
        </div>

        {/* Daily Challenge */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">🎯 Daily Challenge</h2>
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-800">{dailyChallenge.challenge}</h3>
              <div className="flex items-center mt-2">
                <div className="w-full bg-gray-200 rounded-full h-3 mr-4">
                  <div 
                    className="bg-green-500 h-3 rounded-full transition-all duration-300" 
                    style={{width: `${(dailyChallenge.progress / dailyChallenge.total) * 100}%`}}
                  ></div>
                </div>
                <span className="text-gray-600 font-medium">
                  {dailyChallenge.progress}/{dailyChallenge.total}
                </span>
              </div>
            </div>
            <div className="text-center ml-6">
              <div className="text-2xl mb-1">💰</div>
              <p className="text-sm text-gray-600">+{dailyChallenge.reward} points</p>
            </div>
          </div>
        </div>

        {/* Attendance Overview */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">📊 Attendance Overview</h2>
          
          <div className="space-y-4">
            {attendanceData.map((record, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-medium text-gray-800">{record.subject}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getAttendanceColor(record.percentage)}`}>
                    {record.percentage}%
                  </span>
                </div>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex-1 mr-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>{record.attended}/{record.total} classes attended</span>
                      <span>{record.total - record.attended} missed</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${getProgressBarColor(record.percentage)}`}
                        style={{width: `${record.percentage}%`}}
                      ></div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => markAttendance(record.subject)}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Mark Present (+25 points)
                  </button>
                </div>
                
                {record.percentage < 75 && (
                  <div className="bg-red-50 border border-red-200 rounded p-3 mt-3">
                    <p className="text-red-800 text-sm">
                      ⚠️ Warning: Need {Math.ceil((0.75 * record.total - record.attended) / 0.25)} more classes to reach 75%
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">🏅 Achievements</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement) => (
              <div key={achievement.id} className={`border rounded-lg p-4 ${achievement.unlocked ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-3xl mr-3">{achievement.icon}</span>
                    <div>
                      <h3 className={`font-semibold ${achievement.unlocked ? 'text-green-800' : 'text-gray-600'}`}>
                        {achievement.title}
                      </h3>
                      <p className={`text-sm ${achievement.unlocked ? 'text-green-600' : 'text-gray-500'}`}>
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                  <div className="text-center">
                    <span className={`font-bold ${achievement.unlocked ? 'text-green-600' : 'text-gray-500'}`}>
                      +{achievement.points}
                    </span>
                    <p className="text-xs text-gray-500">points</p>
                  </div>
                </div>
                {achievement.unlocked && (
                  <div className="mt-2 text-green-600 font-medium text-sm">✅ Unlocked!</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Leaderboard */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">🏆 Class Leaderboard</h2>
          
          <div className="space-y-3">
            {[
              { rank: 1, name: 'Aarav Sharma', points: 1580, streak: 15 },
              { rank: 2, name: 'Priya Patel', points: 1420, streak: 12 },
              { rank: 3, name: 'Rohit Kumar', points: 1350, streak: 8 },
              { rank: 23, name: 'You', points: gameStats.totalPoints, streak: gameStats.streakDays, isCurrentUser: true }
            ].map((student) => (
              <div key={student.rank} className={`flex items-center justify-between p-3 rounded-lg ${student.isCurrentUser ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'}`}>
                <div className="flex items-center">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mr-3 ${
                    student.rank === 1 ? 'bg-yellow-500' :
                    student.rank === 2 ? 'bg-gray-400' :
                    student.rank === 3 ? 'bg-amber-600' :
                    'bg-blue-500'
                  }`}>
                    {student.rank}
                  </span>
                  <div>
                    <h3 className={`font-medium ${student.isCurrentUser ? 'text-blue-800' : 'text-gray-800'}`}>
                      {student.name}
                    </h3>
                    <p className="text-sm text-gray-600">{student.streak} day streak</p>
                  </div>
                </div>
                <span className={`font-bold ${student.isCurrentUser ? 'text-blue-600' : 'text-gray-600'}`}>
                  {student.points} pts
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}